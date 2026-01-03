// Simple health check endpoint
export default function handler(req, res) {
  const provider = process.env.LLM_PROVIDER || 'together';
  const model = process.env[`${provider.toUpperCase()}_MODEL`] || 'default';
  
  res.status(200).json({ 
    status: 'ok',
    service: 'Termux LLM API',
    provider: provider,
    model: model,
    timestamp: new Date().toISOString()
  });
}
