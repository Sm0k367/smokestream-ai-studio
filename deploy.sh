#!/bin/bash

# SmokeStream AI Studio Deployment Script
echo "🚀 Deploying SmokeStream AI Studio..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌟 SmokeStream AI Studio is ready for deployment!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Set up your environment variables in production"
    echo "2. Configure your database (PostgreSQL recommended)"
    echo "3. Run: npx prisma db push"
    echo "4. Set up Stripe webhooks"
    echo "5. Deploy to Vercel or your preferred platform"
    echo ""
    echo "🔗 Your Stripe subscription link: https://buy.stripe.com/7sI3dlgcQ4uL0gMeUW"
    echo ""
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
