# Deployment Guide

This guide provides detailed instructions for deploying the Termux LLM service to different hosting platforms.

## Table of Contents
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Heroku Deployment](#heroku-deployment)
- [Environment Variables](#environment-variables)
- [Free Tier Limits](#free-tier-limits)

## Vercel Deployment

Vercel is the recommended platform as it's optimized for Next.js applications.

### Method 1: One-Click Deploy

1. Click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RecklessEvadingDriver/Termux)
2. Connect your GitHub account
3. Configure environment variables (see below)
4. Click "Deploy"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add LLM_PROVIDER
vercel env add TOGETHER_API_KEY

# Deploy to production
vercel --prod
```

### Method 3: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure environment variables
6. Deploy!

## Netlify Deployment

### Method 1: One-Click Deploy

1. Click: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/RecklessEvadingDriver/Termux)
2. Connect your GitHub account
3. Configure environment variables
4. Click "Deploy site"

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install netlify-cli -g

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

### Method 3: Git Integration

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "New site from Git"
4. Select repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Deploy!

## Heroku Deployment

### Method 1: One-Click Deploy

1. Click: [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/RecklessEvadingDriver/Termux)
2. Enter app name
3. Configure environment variables (pre-filled from app.json)
4. Click "Deploy app"

### Method 2: Heroku CLI

```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set LLM_PROVIDER=together
heroku config:set TOGETHER_API_KEY=your_key_here
heroku config:set TOGETHER_MODEL=NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO
heroku config:set RATE_LIMIT=10
heroku config:set MAX_TOKENS=512

# Deploy
git push heroku main

# Open app
heroku open
```

### Method 3: Heroku Dashboard

1. Go to [dashboard.heroku.com](https://dashboard.heroku.com)
2. Click "New" > "Create new app"
3. Connect to GitHub repository
4. Enable automatic deploys
5. Add environment variables in Settings > Config Vars
6. Manually deploy from branch

## Environment Variables

### Required Variables

At minimum, you need to set these based on your chosen provider:

#### For Together AI (Recommended)
```
LLM_PROVIDER=together
TOGETHER_API_KEY=your_together_ai_api_key
```

#### For Hugging Face
```
LLM_PROVIDER=huggingface
HUGGINGFACE_API_KEY=your_huggingface_token
```

#### For OpenRouter
```
LLM_PROVIDER=openrouter
OPENROUTER_API_KEY=your_openrouter_api_key
```

### Optional Variables

```
TOGETHER_MODEL=NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO
HUGGINGFACE_MODEL=mistralai/Mistral-7B-Instruct-v0.2
OPENROUTER_MODEL=gryphe/mythomist-7b
RATE_LIMIT=10
MAX_TOKENS=512
```

## Getting API Keys

### Together AI
1. Go to https://api.together.xyz/
2. Sign up for an account
3. Go to Settings > API Keys
4. Create new API key
5. Copy and save the key

### Hugging Face
1. Go to https://huggingface.co/
2. Sign up or log in
3. Go to Settings > Access Tokens
4. Create new token with "read" permissions
5. Copy and save the token

### OpenRouter
1. Go to https://openrouter.ai/
2. Sign up for an account
3. Go to Keys section
4. Create new API key
5. Add credits to your account
6. Copy and save the key

## Free Tier Limits

### Vercel
- **Bandwidth**: 100 GB/month
- **Executions**: 100 GB-hours/month
- **Build time**: 100 hours/month
- **Serverless functions**: 12-second timeout
- **Good for**: Low to medium traffic

### Netlify
- **Bandwidth**: 100 GB/month
- **Build minutes**: 300/month
- **Functions**: 125K requests/month (free tier)
- **Good for**: Low traffic, static content

### Heroku
- **Dyno hours**: 550-1000/month (free tier being phased out)
- **Note**: Heroku has transitioned away from free tiers
- **Good for**: Small apps, testing (with paid plan)

### LLM Provider Limits

#### Together AI
- Free tier: Limited credits
- Pay-as-you-go pricing
- Good free tier for testing

#### Hugging Face
- Free Inference API
- Rate limits apply
- May have cold starts

#### OpenRouter
- Pay-as-you-go
- No free tier (requires credits)
- Competitive pricing

## Performance Optimization

### For Vercel/Netlify
1. Enable caching headers
2. Use CDN for static assets
3. Optimize bundle size
4. Use serverless functions efficiently

### For Heroku
1. Use worker dynos for background tasks
2. Enable Redis for caching (paid add-on)
3. Scale dynos based on traffic
4. Use CDN for static content

## Troubleshooting

### Build Failures
- Check Node.js version (must be 18+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Runtime Errors
- Verify environment variables are set correctly
- Check API keys have sufficient credits
- Review function logs for errors

### Performance Issues
- Reduce MAX_TOKENS if responses are slow
- Implement caching for repeated queries
- Consider upgrading to paid tier for higher limits

## Monitoring

### Vercel
- Built-in analytics in dashboard
- Function logs in deployments
- Real-time monitoring

### Netlify
- Analytics in dashboard
- Function logs available
- Deployment history

### Heroku
- Heroku logs: `heroku logs --tail`
- Metrics in dashboard
- Add-ons for advanced monitoring

## Custom Domains

### Vercel
1. Go to project settings
2. Add domain
3. Configure DNS
4. SSL automatically provisioned

### Netlify
1. Go to domain settings
2. Add custom domain
3. Update DNS records
4. SSL automatically provisioned

### Heroku
1. Go to app settings
2. Add domain
3. Configure DNS CNAME
4. SSL available with paid dynos

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all secrets
3. **Enable rate limiting** (already built-in)
4. **Monitor usage** to detect abuse
5. **Set up alerts** for unusual activity
6. **Use HTTPS** (automatic on all platforms)
7. **Implement authentication** for production use

## Cost Estimation

### Monthly Costs (USD)

**Free Tier (Low Traffic)**
- Hosting: $0
- API calls: ~$0-5 (depends on usage)
- Total: ~$0-5/month

**Moderate Traffic**
- Hosting: $0-20 (Vercel Pro if needed)
- API calls: ~$10-50
- Total: ~$10-70/month

**High Traffic**
- Hosting: $20-100
- API calls: $50-500+
- Total: $70-600+/month

## Scaling Considerations

1. **Start with free tiers** to test
2. **Monitor usage** patterns
3. **Implement caching** to reduce API calls
4. **Use rate limiting** to control costs
5. **Consider upgrading** to paid tiers as needed
6. **Optimize prompts** to reduce token usage
7. **Batch requests** when possible

## Next Steps

After deployment:
1. Test the health endpoint: `https://your-app.com/api/health`
2. Try the chat interface: `https://your-app.com`
3. Test the API with examples from API_EXAMPLES.md
4. Monitor usage and costs
5. Set up custom domain (optional)
6. Implement authentication if needed
7. Add monitoring and alerts
