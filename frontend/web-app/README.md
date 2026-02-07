# NGO Connect - Web Application

Modern web application for NGO coordination and content filtration platform.

## Features

### NGO Management
- NGO registration and verification
- Beneficiary management
- Donation tracking
- Distribution planning
- Analytics dashboard

### Content Safety
- User safety settings
- Content filtering preferences
- Privacy controls
- Personalized feed

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Maps**: MapboxGL
- **Charts**: Recharts

## Getting Started

```bash
cd frontend/web-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
web-app/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── ngo/               # NGO management
│   ├── beneficiaries/     # Beneficiary management
│   ├── donations/         # Donation tracking
│   ├── feed/              # Content feed
│   └── settings/          # User settings
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── forms/            # Form components
│   ├── charts/           # Chart components
│   └── maps/             # Map components
├── lib/                  # Utilities
│   ├── api/             # API clients
│   ├── hooks/           # Custom hooks
│   └── utils/           # Helper functions
├── types/               # TypeScript types
└── public/              # Static assets
```

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```
