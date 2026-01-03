# API Examples

## Using cURL

### Basic Chat Request
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello! Can you help me?"}
    ]
  }'
```

### Multi-turn Conversation
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What is 2+2?"},
      {"role": "assistant", "content": "2+2 equals 4."},
      {"role": "user", "content": "What about 3+3?"}
    ]
  }'
```

### Health Check
```bash
curl http://localhost:3000/api/health
```

## Using JavaScript/Fetch

```javascript
async function chat(message) {
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        { role: 'user', content: message }
      ]
    })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Usage
chat('Tell me a joke').then(console.log);
```

## Using Python

```python
import requests
import json

def chat(message):
    response = requests.post(
        'http://localhost:3000/api/chat',
        headers={'Content-Type': 'application/json'},
        json={
            'messages': [
                {'role': 'user', 'content': message}
            ]
        }
    )
    return response.json()['choices'][0]['message']['content']

# Usage
print(chat('Hello!'))
```

## Using Node.js

```javascript
const https = require('https');

function chat(message) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      messages: [
        { role: 'user', content: message }
      ]
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve(JSON.parse(body).choices[0].message.content));
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Usage
chat('What is AI?').then(console.log);
```

## Response Format

All successful responses follow this format:

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "The AI's response text here"
      }
    }
  ]
}
```

## Error Responses

### Rate Limit Exceeded (429)
```json
{
  "error": "Rate limit exceeded. Please try again later."
}
```

### Invalid Request (400)
```json
{
  "error": "Invalid request. Messages array is required."
}
```

### Server Error (500)
```json
{
  "error": "Error message details"
}
```
