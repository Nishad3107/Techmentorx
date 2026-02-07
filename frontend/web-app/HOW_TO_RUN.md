# 🚀 How to Run the NGO Connect Web App

## Prerequisites

Before you start, make sure you have:
- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Backend services** running (NGO Service, Blockchain Service, Payment Service)

---

## 📦 Step 1: Install Dependencies

```bash
cd frontend/web-app
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Tailwind CSS
- Stripe & PayPal SDKs
- Form libraries (react-hook-form, zod)
- UI libraries (Headless UI, Hero Icons)
- And more...

---

## ⚙️ Step 2: Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your actual values:

```env
# API URLs (adjust if your backend runs on different ports)
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_NGO_SERVICE_URL=http://localhost:3001
NEXT_PUBLIC_BLOCKCHAIN_SERVICE_URL=http://localhost:3003
NEXT_PUBLIC_PAYMENT_SERVICE_URL=http://localhost:3004

# Stripe (get from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_key

# PayPal (get from https://developer.paypal.com/)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_actual_paypal_client_id

# Blockchain
NEXT_PUBLIC_BLOCKCHAIN_NETWORK=testnet
NEXT_PUBLIC_BLOCKCHAIN_EXPLORER_URL=https://goerli.etherscan.io

# App Config
NEXT_PUBLIC_APP_NAME=NGO Connect
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_BLOCKCHAIN=true
NEXT_PUBLIC_ENABLE_RECURRING_DONATIONS=true
NEXT_PUBLIC_ENABLE_VOLUNTEER_MANAGEMENT=true
```

---

## 🏃 Step 3: Start the Development Server

```bash
npm run dev
```

The app will start on **http://localhost:3000**

You should see:
```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

---

## 🔧 Step 4: Verify Backend Services Are Running

Make sure these services are running:

### Terminal 1 - NGO Service
```bash
cd backend/ngo-service
npm run dev
# Should run on http://localhost:3001
```

### Terminal 2 - Blockchain Service
```bash
cd backend/blockchain-service
npm run dev
# Should run on http://localhost:3003
```

### Terminal 3 - Payment Service
```bash
cd backend/payment-service
npm run dev
# Should run on http://localhost:3004
```

---

## 📱 Available Pages

Once running, you can access:

### Public Pages
- **Home**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **About**: http://localhost:3000/about
- **Donate**: http://localhost:3000/donate
- **Volunteer**: http://localhost:3000/volunteer

### Dashboard Pages (require login)
- **Donor Dashboard**: http://localhost:3000/donor/dashboard
- **NGO Dashboard**: http://localhost:3000/ngo/dashboard
- **Volunteer Dashboard**: http://localhost:3000/volunteer/dashboard

---

## 🧪 Testing

### Test User Accounts

You can create test accounts by registering at http://localhost:3000/register

Choose role:
- **Donor**: To make donations
- **NGO**: To receive donations and manage volunteers
- **Volunteer**: To find opportunities and track hours

### Test Payments (Stripe)

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Exp**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build.

---

## 🎨 Available Features

### ✅ Implemented
- User authentication (login, register)
- Landing page with features
- Responsive design
- UI components (Button, Input, Card)
- API integration setup
- State management (Zustand)
- Form validation (Zod)

### 🚧 In Progress
- Donation flow (one-time & recurring)
- Volunteer management UI
- Dashboards (Donor, NGO, Volunteer)
- Payment integration (Stripe, PayPal)
- Blockchain verification UI

---

## 📂 Project Structure

```
frontend/web-app/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── donate/            # Donation pages
│   ├── volunteer/         # Volunteer pages
│   ├── donor/             # Donor dashboard
│   ├── ngo/               # NGO dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   └── ui/                # UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
├── lib/                   # Utilities
│   ├── api/               # API clients
│   ├── store/             # State management
│   └── utils/             # Helper functions
├── public/                # Static assets
└── styles/                # Global styles
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
npm run dev -- -p 3001
```

### Backend Not Connecting
- Check if backend services are running
- Verify API URLs in `.env.local`
- Check browser console for CORS errors

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind CSS Not Working
```bash
# Make sure Tailwind is configured
npm run dev
# Check tailwind.config.ts exists
```

---

## 📚 Additional Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Run tests
npm test

# Build and start production
npm run build && npm start
```

---

## 🔗 Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **React Hook Form**: https://react-hook-form.com

---

## ✨ Quick Start Summary

```bash
# 1. Install
cd frontend/web-app && npm install

# 2. Configure
cp .env.local.example .env.local
# Edit .env.local with your API keys

# 3. Run
npm run dev

# 4. Open browser
http://localhost:3000
```

---

**That's it! Your NGO Connect web app is now running! 🎉**

For issues, check the troubleshooting section or backend service logs.
