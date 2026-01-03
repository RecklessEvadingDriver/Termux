// API route for LLM chat completion
// Supports multiple lightweight uncensored LLM providers

// Note: In-memory rate limiting has limitations in serverless environments
// where function instances don't share state. For production use with high
// traffic, consider using external storage (Redis, DynamoDB, etc.)
const rateLimitMap = new Map();

function getClientIP(req) {
  // Try to get the real IP, but be aware this can be spoofed
  // In production, consider using Vercel's or Netlify's trusted proxy headers
  const forwarded = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  
  if (forwarded) {
    // Take the first IP in the chain (client IP)
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return req.socket.remoteAddress || 'unknown';
}

function checkRateLimit(ip) {
  const limit = parseInt(process.env.RATE_LIMIT || '10');
  const now = Date.now();
  const windowMs = 60000; // 1 minute

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const record = rateLimitMap.get(ip);
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

async function callTogetherAPI(messages, model) {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    throw new Error('TOGETHER_API_KEY not configured');
  }

  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO',
      messages: messages,
      max_tokens: parseInt(process.env.MAX_TOKENS || '512'),
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Together API error: ${error}`);
  }

  return await response.json();
}

async function callHuggingFaceAPI(messages, model) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    throw new Error('HUGGINGFACE_API_KEY not configured');
  }

  // Convert messages to a single prompt
  const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n');

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model || 'mistralai/Mistral-7B-Instruct-v0.2'}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: parseInt(process.env.MAX_TOKENS || '512'),
          temperature: 0.7,
          top_p: 0.7,
          return_full_text: false
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Hugging Face API error: ${error}`);
  }

  const result = await response.json();
  
  // Format response to match OpenAI-style response
  return {
    choices: [{
      message: {
        role: 'assistant',
        content: result[0]?.generated_text || ''
      }
    }]
  };
}

async function callOpenRouterAPI(messages, model) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not configured');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.VERCEL_URL || 'http://localhost:3000',
      'X-Title': 'Termux LLM'
    },
    body: JSON.stringify({
      model: model || 'gryphe/mythomist-7b',
      messages: messages,
      max_tokens: parseInt(process.env.MAX_TOKENS || '512'),
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${error}`);
  }

  return await response.json();
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get client IP for rate limiting
  const ip = getClientIP(req);
  
  // Check rate limit
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded. Please try again later.' 
    });
  }

  try {
    const { messages, model } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Invalid request. Messages array is required.' 
      });
    }

    // Determine provider
    const provider = process.env.LLM_PROVIDER || 'together';
    
    let result;
    switch (provider) {
      case 'together':
        result = await callTogetherAPI(messages, model);
        break;
      case 'huggingface':
        result = await callHuggingFaceAPI(messages, model);
        break;
      case 'openrouter':
        result = await callOpenRouterAPI(messages, model);
        break;
      default:
        return res.status(400).json({ 
          error: `Unknown provider: ${provider}` 
        });
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error('LLM API Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
