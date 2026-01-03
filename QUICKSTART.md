# Quick Start Guide

Get your uncensored LLM service running in 5 minutes!

## Step 1: Choose Your LLM Provider

You need an API key from one of these providers:

### Together AI (Recommended) ⭐
- **Why**: Fast, reliable, good free tier, truly uncensored
- **Get API Key**: https://api.together.xyz/signup
- **Free Credits**: Yes ($25 on signup)
- **Setup Time**: 2 minutes

### Hugging Face
- **Why**: Many model options, generous free tier
- **Get API Key**: https://huggingface.co/settings/tokens
- **Free Credits**: Yes (with rate limits)
- **Setup Time**: 2 minutes

### OpenRouter
- **Why**: Access to multiple models
- **Get API Key**: https://openrouter.ai/
- **Free Credits**: No (need to add credits)
- **Setup Time**: 3 minutes

## Step 2: Get Your API Key

### For Together AI:
1. Go to https://api.together.xyz/
2. Click "Sign Up" or "Login"
3. Navigate to "API Keys" in settings
4. Click "Create API Key"
5. Copy the key (starts with `sk-...`)

## Step 3: Deploy to Vercel (Easiest)

### Option A: One-Click Deploy (60 seconds)

1. Click this button:
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RecklessEvadingDriver/Termux)

2. Login to Vercel (free account)

3. Add these environment variables:
   ```
   LLM_PROVIDER=together
   TOGETHER_API_KEY=sk-your-actual-key-here
   ```

4. Click "Deploy"

5. Wait 1-2 minutes

6. Done! Visit your URL

### Option B: Vercel CLI (2 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Clone this repo
git clone https://github.com/RecklessEvadingDriver/Termux.git
cd Termux

# Deploy
vercel

# Add your API key
vercel env add TOGETHER_API_KEY production
# Enter your key when prompted

vercel env add LLM_PROVIDER production
# Enter: together

# Deploy to production
vercel --prod
```

## Step 4: Test Your Deployment

### Via Web Interface
1. Open your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Type a message in the chat box
3. Click "Send"
4. You should get a response!

### Via API (cURL)
```bash
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
```

### Check Health
```bash
curl https://your-app.vercel.app/api/health
```

## Step 5: Optional Configuration

### Adjust Rate Limiting
```bash
vercel env add RATE_LIMIT production
# Enter a number like: 20
```

### Change Model
```bash
vercel env add TOGETHER_MODEL production
# Enter: NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO
```

### Adjust Max Tokens
```bash
vercel env add MAX_TOKENS production
# Enter a number like: 1024
```

Then redeploy:
```bash
vercel --prod
```

## Alternative: Deploy to Netlify

1. Click: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/RecklessEvadingDriver/Termux)

2. Add environment variables in Netlify dashboard:
   - `LLM_PROVIDER=together`
   - `TOGETHER_API_KEY=your_key_here`

3. Deploy!

## Alternative: Deploy to Heroku

1. Click: [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/RecklessEvadingDriver/Termux)

2. Fill in the environment variables

3. Deploy!

## Local Development

Want to test locally first?

```bash
# Clone the repo
git clone https://github.com/RecklessEvadingDriver/Termux.git
cd Termux

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your API key
nano .env  # or use any text editor

# Add this line:
TOGETHER_API_KEY=your_key_here

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Troubleshooting

### "API key not configured"
- Make sure you added the API key as an environment variable
- Check it's named correctly: `TOGETHER_API_KEY` (or `HUGGINGFACE_API_KEY`)
- Redeploy after adding environment variables

### "Rate limit exceeded"
- Wait 60 seconds
- Or increase `RATE_LIMIT` environment variable

### "Build failed"
- Check that Node.js version is 18+ in your platform settings
- Try clearing the build cache and rebuilding

### "Module not found"
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

### API returns errors
- Check your API key has credits
- Verify the provider is correctly set
- Check API provider status page

## Usage Examples

### Simple Chat
```bash
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Tell me a joke"}
    ]
  }'
```

### Conversation
```bash
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What is 2+2?"},
      {"role": "assistant", "content": "4"},
      {"role": "user", "content": "And 3+3?"}
    ]
  }'
```

### JavaScript
```javascript
const response = await fetch('https://your-app.vercel.app/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});
const data = await response.json();
console.log(data.choices[0].message.content);
```

## What's Next?

- 📖 Read [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guides
- 🔒 Check [SECURITY.md](SECURITY.md) for production security tips
- 💻 See [API_EXAMPLES.md](API_EXAMPLES.md) for more code examples
- 📚 Read [README.md](README.md) for complete documentation

## Need Help?

1. Check the documentation files
2. Review error logs in your platform dashboard
3. Verify API key and environment variables
4. Open an issue on GitHub

## Cost Estimate

### Free Tier (Testing)
- Hosting: **$0** (Vercel/Netlify free tier)
- API Calls: **$0-5** (depends on provider free credits)
- **Total: ~$0-5/month**

### Light Usage (1000 requests/month)
- Hosting: **$0**
- API Calls: **~$1-10**
- **Total: ~$1-10/month**

### Moderate Usage (10,000 requests/month)
- Hosting: **$0-20**
- API Calls: **~$10-100**
- **Total: ~$10-120/month**

## Success!

If you see a response from the AI, congratulations! 🎉

Your uncensored LLM service is now live and ready to use!

Remember:
- ⚡ It's lightweight and runs on free tiers
- 🔓 Uses uncensored models for open conversations
- 🚀 Hosted on reliable platforms
- 💰 Minimal costs

Enjoy your AI service! 🤖
