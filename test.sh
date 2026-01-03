#!/bin/bash

echo "======================================"
echo "Termux LLM - Installation Verification"
echo "======================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js version..."
node --version
if [ $? -eq 0 ]; then
    echo "  → Node.js is installed"
else
    echo "  ✗ Node.js is not installed"
    exit 1
fi
echo ""

# Check npm
echo "✓ Checking npm version..."
npm --version
if [ $? -eq 0 ]; then
    echo "  → npm is installed"
else
    echo "  ✗ npm is not installed"
    exit 1
fi
echo ""

# Check if dependencies are installed
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "  → Dependencies are installed"
else
    echo "  ✗ Dependencies not installed. Run: npm install"
    exit 1
fi
echo ""

# Check if .env exists
echo "✓ Checking environment configuration..."
if [ -f ".env" ]; then
    echo "  → .env file found"
    if grep -q "API_KEY" .env; then
        echo "  → API key configured"
    else
        echo "  ⚠ Warning: API key may not be configured"
    fi
else
    echo "  ⚠ Warning: .env file not found"
    echo "  → You can copy .env.example to .env and add your API key"
fi
echo ""

# Try to build
echo "✓ Testing build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "  → Build successful!"
else
    echo "  ✗ Build failed. Check your configuration."
    exit 1
fi
echo ""

# Check linting
echo "✓ Running linter..."
npm run lint > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "  → No linting errors!"
else
    echo "  ⚠ Warning: Linting errors found"
fi
echo ""

echo "======================================"
echo "✓ All checks passed!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Configure your .env file with API keys"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "Or deploy to:"
echo "• Vercel: vercel"
echo "• Netlify: netlify deploy"
echo "• Heroku: git push heroku main"
echo ""
