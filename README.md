# Termux LLM

A lightweight, uncensored LLM service that can be easily deployed on Vercel, Netlify, or Heroku. This project provides a simple web interface and API for interacting with various uncensored language models.

## Features

- 🚀 **Easy Deployment** - One-click deployment to Vercel, Netlify, or Heroku
- 🔓 **Uncensored Models** - Uses unrestricted language models for open conversations
- ⚡ **Lightweight** - Optimized for free-tier hosting with minimal resource usage
- 🛡️ **Rate Limiting** - Built-in rate limiting to prevent abuse
- 🔌 **Multiple Providers** - Support for Together AI, Hugging Face, and OpenRouter
- 💬 **Simple UI** - Clean chat interface for easy interaction
- 🔧 **API Endpoints** - RESTful API for programmatic access

## Supported LLM Providers

### 1. Together AI (Recommended)
- **Model**: NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO
- **Pros**: Fast, reliable, uncensored, good free tier
- **Get API Key**: https://api.together.xyz/

### 2. Hugging Face Inference API
- **Model**: mistralai/Mistral-7B-Instruct-v0.2 (or any uncensored model)
- **Pros**: Wide model selection, generous free tier
- **Get API Key**: https://huggingface.co/settings/tokens

### 3. OpenRouter
- **Model**: gryphe/mythomist-7b (or any available uncensored model)
- **Pros**: Access to multiple models through one API
- **Get API Key**: https://openrouter.ai/

## Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn
- API key from one of the supported providers

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RecklessEvadingDriver/Termux.git
cd Termux
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` and add your API key:
```env
LLM_PROVIDER=together
TOGETHER_API_KEY=your_api_key_here
TOGETHER_MODEL=NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO
RATE_LIMIT=10
MAX_TOKENS=512
```

5. Run development server:
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser

## Deployment

### Deploy to Vercel (Recommended)

1. Click the button below or go to [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RecklessEvadingDriver/Termux)

2. Add environment variables in Vercel dashboard:
   - `LLM_PROVIDER` - Choose: together, huggingface, or openrouter
   - `TOGETHER_API_KEY` - Your Together AI API key (or corresponding provider key)
   - `TOGETHER_MODEL` - Model name (optional, uses default)
   - `RATE_LIMIT` - Requests per minute (optional, default: 10)
   - `MAX_TOKENS` - Maximum response tokens (optional, default: 512)

3. Deploy!

### Deploy to Netlify

1. Click the button below or go to [Netlify](https://app.netlify.com/start):

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/RecklessEvadingDriver/Termux)

2. Add environment variables in Netlify dashboard (same as Vercel)

3. Deploy!

### Deploy to Heroku

1. Click the button below or use Heroku CLI:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/RecklessEvadingDriver/Termux)

2. Or using CLI:
```bash
heroku create your-app-name
heroku config:set LLM_PROVIDER=together
heroku config:set TOGETHER_API_KEY=your_api_key_here
git push heroku main
```

## API Usage

### Chat Completion Endpoint

**POST** `/api/chat`

Request body:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "model": "optional-model-override"
}
```

Response:
```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "I'm doing well, thank you for asking!"
      }
    }
  ]
}
```

### Health Check Endpoint

**GET** `/api/health`

Response:
```json
{
  "status": "ok",
  "service": "Termux LLM API",
  "provider": "together",
  "model": "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
  "timestamp": "2026-01-03T15:16:29.145Z"
}
```

## Example cURL Request

```bash
curl -X POST https://your-deployment.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Write a poem about coding"}
    ]
  }'
```

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `LLM_PROVIDER` | Provider to use (together, huggingface, openrouter) | together | No |
| `TOGETHER_API_KEY` | Together AI API key | - | Yes (if using Together) |
| `TOGETHER_MODEL` | Together AI model name | NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO | No |
| `HUGGINGFACE_API_KEY` | Hugging Face API key | - | Yes (if using HF) |
| `HUGGINGFACE_MODEL` | Hugging Face model name | mistralai/Mistral-7B-Instruct-v0.2 | No |
| `OPENROUTER_API_KEY` | OpenRouter API key | - | Yes (if using OpenRouter) |
| `OPENROUTER_MODEL` | OpenRouter model name | gryphe/mythomist-7b | No |
| `RATE_LIMIT` | Max requests per minute per IP | 10 | No |
| `MAX_TOKENS` | Maximum tokens in response | 512 | No |

## Rate Limiting

The API includes built-in rate limiting to prevent abuse:
- Default: 10 requests per minute per IP address
- Configurable via `RATE_LIMIT` environment variable
- Returns 429 status code when limit exceeded

## Uncensored Models

This project is designed to work with uncensored language models. Some recommended models:

- **NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO** (Together AI) - Highly capable, uncensored
- **gryphe/mythomist-7b** (OpenRouter) - Creative, uncensored
- **Mistral models** (Hugging Face) - Various uncensored versions available

## Security Considerations

⚠️ **Important**: Uncensored models can generate content without restrictions. Consider:

1. Add authentication if deploying publicly
2. Monitor usage and costs
3. Implement content filtering if needed for your use case
4. Be aware of hosting provider's terms of service
5. Use rate limiting (already built-in)

## Troubleshooting

### API Key Issues
- Ensure API key is correctly set in environment variables
- Check that the key has sufficient credits/quota
- Verify the provider is correctly specified

### Rate Limit Errors
- Increase `RATE_LIMIT` environment variable
- Wait 60 seconds between bursts of requests

### Model Not Found
- Verify model name is correct for your provider
- Check provider documentation for available models

### Build Errors
- Ensure Node.js version is 18.0.0 or higher
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## Development

### Project Structure
```
Termux/
├── pages/
│   ├── api/
│   │   ├── chat.js       # Main LLM endpoint
│   │   └── health.js     # Health check endpoint
│   ├── _app.js           # App wrapper
│   ├── _document.js      # Document wrapper
│   └── index.js          # Main UI
├── styles/
│   ├── globals.css       # Global styles
│   └── Home.module.css   # Component styles
├── public/               # Static assets
├── .env.example          # Environment template
├── next.config.js        # Next.js configuration
├── vercel.json           # Vercel config
├── netlify.toml          # Netlify config
├── Procfile              # Heroku config
└── package.json          # Dependencies
```

### Running Tests
```bash
npm run lint
```

### Building for Production
```bash
npm run build
npm start
```

## Performance Tips

1. **Use Together AI** - Generally fastest for serverless
2. **Keep MAX_TOKENS low** - Reduces response time and costs
3. **Enable caching** - Add caching layer for repeated queries
4. **Monitor usage** - Track API costs and adjust rate limits

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Disclaimer

This project provides access to uncensored AI models. Users are responsible for:
- Complying with hosting provider terms of service
- Using the service ethically and legally
- Any content generated through the service
- API costs incurred

The developers are not responsible for how this tool is used or any content generated through it.