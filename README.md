# LinkHive - Complete Link-in-Bio SaaS Platform

A modern, feature-rich link-in-bio platform built with Next.js 14, TypeScript, and Supabase. LinkHive is a complete SaaS solution that allows users to create customizable "link-in-bio" pages with QR codes, statistics, branding, and shareable public profiles.

## 🚀 Features

### Core Features
- **Link-in-Bio Pages**: Create customizable pages with multiple links and themes
- **QR Code Generation**: Generate custom QR codes for URLs, text, email, phone, and WiFi
- **Short Links**: Create and manage short URLs with analytics
- **Analytics Dashboard**: Track views, clicks, engagement, and performance
- **User Authentication**: Secure authentication with Clerk (MFA, RBAC)
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Built-in theme support with system preference detection

### Advanced Features
- **Custom Themes**: Multiple theme options (default, minimal, dark, colorful, professional)
- **Password Protection**: Protect pages and links with passwords
- **Expiration Dates**: Set expiration dates for short links
- **Social Media Integration**: Easy sharing to all major platforms
- **Export Data**: Export analytics and data in JSON/CSV formats
- **Real-time Notifications**: Get notified of new views, clicks, and scans
- **Bulk Operations**: Manage multiple items efficiently

### Business Features
- **Subscription Plans**: Free, Pro, and Enterprise tiers
- **Stripe Integration**: Secure payment processing
- **Usage Limits**: Plan-based feature restrictions
- **Team Management**: Multi-user support (Enterprise)
- **White-label Options**: Custom branding (Enterprise)

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **UI Library**: React 18
- **Styling**: Tailwind CSS + Radix UI
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod validation

### Backend & Infrastructure
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Clerk (MFA, RBAC, social logins)
- **Payments**: Stripe (subscriptions, one-time payments)
- **Email**: Resend (transactional emails)
- **File Storage**: Supabase Storage
- **Deployment**: Vercel (edge functions, serverless)

### Development & Quality
- **Testing**: Jest (unit), Playwright (e2e)
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Monorepo**: Turbo for build optimization
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry (error tracking)

## 📦 Project Structure

```
linkhive/
├── apps/
│   └── web/                          # Next.js web application
│       ├── src/
│       │   ├── app/                  # App router pages
│       │   │   ├── (auth)/           # Authentication pages
│       │   │   ├── dashboard/        # Dashboard pages
│       │   │   ├── api/              # API routes
│       │   │   └── [slug]/           # Public profile pages
│       │   ├── components/           # React components
│       │   │   ├── dashboard/        # Dashboard components
│       │   │   ├── layout/           # Layout components
│       │   │   ├── pages/            # Page management
│       │   │   ├── qr-codes/         # QR code components
│       │   │   ├── short-links/      # Short link components
│       │   │   ├── analytics/        # Analytics components
│       │   │   ├── settings/         # Settings components
│       │   │   ├── sections/         # Landing page sections
│       │   │   └── ui/               # UI components
│       │   ├── hooks/                # Custom React hooks
│       │   ├── lib/                  # Utility functions
│       │   ├── stores/               # Zustand stores
│       │   └── types/                # TypeScript types
│       ├── public/                   # Static assets
│       └── tests/                    # Test files
├── packages/
│   ├── ui/                           # Shared UI components
│   │   ├── src/
│   │   │   ├── components/           # Radix UI components
│   │   │   └── lib/                  # UI utilities
│   │   └── package.json
│   ├── database/                     # Database client and types
│   │   ├── src/
│   │   │   ├── client.ts             # Supabase client
│   │   │   ├── types.ts              # Database types
│   │   │   ├── queries.ts            # Query functions
│   │   │   └── mutations.ts          # Mutation functions
│   │   └── package.json
│   └── config/                       # Shared configuration
│       ├── src/
│       │   ├── site.ts               # Site configuration
│       │   ├── navigation.ts         # Navigation config
│       │   ├── features.ts           # Features config
│       │   └── pricing.ts            # Pricing plans
│       └── package.json
├── supabase/                         # Database migrations
│   └── migrations/
├── docs/                             # Documentation
└── scripts/                          # Build and deployment scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account
- Clerk account
- Stripe account (for payments)
- Resend account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/linkhive.git
   cd linkhive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   CLERK_WEBHOOK_SECRET=whsec_...

   # Supabase Database
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...

   # Stripe Payments
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Email (Resend)
   RESEND_API_KEY=re_...

   # Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
   NEXT_PUBLIC_MICROSOFT_CLARITY_ID=...

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. **Set up the database**
   ```bash
   # Apply migrations
   npm run db:push
   
   # Generate types
   npm run db:generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses the following main tables:

### Users & Profiles
- `users` - User accounts and authentication data
- `profiles` - Link-in-bio pages with themes and settings

### Content Management
- `links` - Individual links within profiles
- `qr_codes` - Generated QR codes with customization
- `short_links` - Shortened URLs with analytics

### Analytics & Tracking
- `analytics` - Event tracking and user behavior data
- `subscriptions` - User subscription and billing data

### Security Features
- **Row Level Security (RLS)** - Users can only access their own data
- **Input Validation** - Zod schemas for all API endpoints
- **Rate Limiting** - Configurable rate limits for API routes
- **CORS Protection** - Proper CORS configuration

## 🔧 Configuration

### Environment Variables

#### Required Variables
```env
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Payments
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
RESEND_API_KEY=
```

#### Optional Variables
```env
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_MICROSOFT_CLARITY_ID=
SENTRY_DSN=

# App Configuration
NEXT_PUBLIC_APP_URL=
NEXTAUTH_SECRET=
```

### Customization

#### Themes
The platform supports multiple themes that can be customized in `packages/config/src/site.ts`:

```typescript
export const themes = {
  default: { /* theme configuration */ },
  minimal: { /* theme configuration */ },
  dark: { /* theme configuration */ },
  colorful: { /* theme configuration */ },
  professional: { /* theme configuration */ },
};
```

#### Pricing Plans
Update pricing plans in `packages/config/src/pricing.ts`:

```typescript
export const pricingConfig = {
  plans: [
    {
      name: 'Free',
      price: 0,
      features: [/* feature list */],
    },
    {
      name: 'Pro',
      price: 9,
      features: [/* feature list */],
    },
    // Add more plans...
  ],
};
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

### Environment Setup

Ensure all environment variables are set in your production environment:

- **Clerk**: Set up webhook endpoints
- **Supabase**: Configure RLS policies
- **Stripe**: Set up webhook endpoints
- **Resend**: Configure email templates

## 📊 Analytics & Monitoring

### Built-in Analytics
- Page views and link clicks
- Geographic data
- Device and browser statistics
- Real-time tracking

### External Analytics
- **Google Analytics**: User behavior tracking
- **Microsoft Clarity**: Session recordings
- **Sentry**: Error tracking and monitoring

### Health Monitoring
- Health check endpoint: `/api/health`
- Database connectivity monitoring
- Service status tracking

## 🔒 Security

### Authentication
- **Clerk**: Multi-factor authentication
- **Role-based access control (RBAC)**
- **Social login providers**
- **Session management**

### Data Protection
- **Row Level Security (RLS)** in Supabase
- **Input validation** with Zod
- **CSRF protection**
- **Rate limiting**
- **Content Security Policy (CSP)**

### Privacy
- **GDPR compliance**
- **Data encryption** at rest and in transit
- **User data export/deletion**
- **Privacy policy integration**

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm run test
   npm run test:e2e
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- **TypeScript**: Use strict mode and proper typing
- **Testing**: Write unit and e2e tests for new features
- **Documentation**: Update README and add JSDoc comments
- **Code Style**: Follow ESLint and Prettier configuration
- **Commits**: Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.linkhive.com](https://docs.linkhive.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/linkhive/issues)
- **Discord**: [Join our community](https://discord.gg/linkhive)
- **Email**: support@linkhive.com

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Supabase** for the database and authentication
- **Clerk** for user management
- **Stripe** for payment processing
- **Vercel** for hosting and deployment
- **Radix UI** for accessible components
- **Tailwind CSS** for styling

---

**LinkHive** - The modern link-in-bio platform for creators and businesses.

Built with ❤️ using Next.js, TypeScript, and Supabase.
