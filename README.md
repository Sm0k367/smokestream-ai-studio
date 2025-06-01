# 🚀 SmokeStream AI Studio - Unrestricted Media Generation SaaS

A powerful SaaS platform for generating any type of media with AI - text, images, music, videos, code, and more without restrictions.

## 🌟 Features

- **Unrestricted AI Chat Interface** - Generate any type of content
- **Multi-Modal Generation** - Text, images, audio, video, code
- **Stripe Integration** - Subscription management with your existing link
- **Real-time Chat** - Live AI interaction with WebSocket support
- **Usage Tracking** - Monitor generations and limits
- **Responsive Design** - Works on desktop and mobile
- **Dark Theme** - Modern cyberpunk aesthetic

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (recommended) or SQLite for development
- **Authentication**: NextAuth.js
- **Payments**: Stripe subscriptions
- **AI**: OpenAI GPT-4, DALL-E 3, (extensible to other providers)
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/Sm0k367/smokestream-ai-studio.git
cd smokestream-ai-studio
npm install
2. Environment Setup
Copy .env.local and fill in your API keys:

cp .env.local .env.local.example
Required environment variables:

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/smokestream_ai"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe (Your existing subscription)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
STRIPE_PRICE_ID="price_your_subscription_price_id"

# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key"

# Optional: Other AI Providers
ANTHROPIC_API_KEY="your-anthropic-key"
REPLICATE_API_TOKEN="your-replicate-token"
3. Database Setup
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# Optional: Seed database
npx prisma db seed
4. Development
npm run dev
Visit http://localhost:3000

🔧 Configuration
Stripe Integration
Your existing Stripe subscription link is already integrated: https://buy.stripe.com/7sI3dlgcQ4uL0gMeUW

To configure webhooks:

Go to Stripe Dashboard → Webhooks
Add endpoint: https://yourdomain.com/api/webhooks/stripe
Select events:
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
invoice.payment_succeeded
invoice.payment_failed
AI Providers
The platform supports multiple AI providers:

OpenAI: GPT-4, DALL-E 3 (primary)
Anthropic: Claude (optional)
Replicate: Various models (optional)
Add API keys to enable additional providers.

📦 Deployment
Vercel (Recommended)
Push to GitHub:
git add .
git commit -m "Initial SmokeStream AI Studio"
git push origin main
Deploy to Vercel:

Connect your GitHub repo to Vercel
Add environment variables in Vercel dashboard
Deploy automatically
Database Setup:

Use Vercel Postgres or external PostgreSQL
Update DATABASE_URL in Vercel environment variables
Run migrations: npx prisma db push
Manual Deployment
# Build the application
npm run build

# Start production server
npm start
🎯 Usage
For Users
Subscribe: Click "Get Started" → Redirects to your Stripe link
Access Dashboard: After subscription, access the AI chat interface
Generate Content: Use natural language to request any type of media
Download/Share: Save generated content locally
For Developers
Adding New AI Providers
Create provider in src/lib/ai-providers/
Add to generation API route
Update UI with new capabilities
Extending Generation Types
Add new type to Prisma schema
Update API route handler
Add UI components for new type
🔒 Security
Authentication: Secure user sessions with NextAuth.js
API Protection: All routes protected with session validation
Rate Limiting: Built-in usage tracking and limits
Webhook Verification: Stripe webhook signature validation
📊 Monitoring
Usage Tracking: Monitor user generations and limits
Error Logging: Comprehensive error handling and logging
Analytics: Track user engagement and feature usage
🛣 Roadmap
 Advanced AI Models: GPT-4 Vision, Claude 3, Gemini
 Music Generation: Suno AI, MusicLM integration
 Video Generation: RunwayML, Pika Labs integration
 API Access: Developer API for external integrations
 Team Features: Collaboration and sharing
 Custom Models: Fine-tuning capabilities
 Mobile App: React Native companion app
💰 Monetization
Current subscription model:

Pro Plan: $29/month (your existing Stripe link)
Unlimited Generations: No restrictions on content type
Priority Processing: Faster generation times
API Access: For developers and integrations
🤝 Contributing
Fork the repository
Create feature branch: git checkout -b feature/amazing-feature
Commit changes: git commit -m 'Add amazing feature'
Push to branch: git push origin feature/amazing-feature
Open Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support
Documentation: docs.smokestream.ai
Discord: Join our community
Twitter: @Sm0ken42O
Email: support@smokestream.ai
🙏 Acknowledgments
OpenAI for GPT-4 and DALL-E 3
Vercel for hosting and deployment
Stripe for payment processing
Next.js team for the amazing framework
Built with ❤️ by @Sm0ken42O

Generate anything, create everything, no limits.
