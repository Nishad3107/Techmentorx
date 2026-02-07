# NGO Connect - Mobile App

Cross-platform mobile application built with React Native and Expo.

## Features

- NGO registration and management
- Beneficiary registration on-the-go
- Donation tracking
- Distribution management
- QR code scanning
- Offline mode support
- Push notifications

## Tech Stack

- **Framework**: React Native + Expo
- **Routing**: Expo Router
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Maps**: React Native Maps

## Getting Started

```bash
cd frontend/mobile-app
npm install
npm start
```

## Running on Devices

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

## Project Structure

```
mobile-app/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation
│   ├── (auth)/            # Authentication screens
│   ├── ngo/               # NGO management
│   ├── beneficiaries/     # Beneficiary management
│   └── donations/         # Donation tracking
├── components/            # Reusable components
├── lib/                   # Utilities and API
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
└── assets/               # Images, fonts, etc.
```

## Environment Variables

Create a `.env` file:

```
EXPO_PUBLIC_API_URL=http://localhost:8080
```
