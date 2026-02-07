# NGO Service

Backend service for managing NGO operations, beneficiaries, donations, and distribution.

## Features

- NGO registration and management
- Beneficiary registration and needs tracking
- Donation and inventory management
- Equitable distribution algorithms
- Real-time analytics and reporting
- Geographic mapping of NGOs and beneficiaries

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register NGO
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token

### NGOs
- `GET /api/ngos` - List all NGOs
- `GET /api/ngos/:id` - Get NGO details
- `PUT /api/ngos/:id` - Update NGO
- `DELETE /api/ngos/:id` - Delete NGO

### Beneficiaries
- `POST /api/beneficiaries` - Register beneficiary
- `GET /api/beneficiaries` - List beneficiaries
- `GET /api/beneficiaries/:id` - Get beneficiary details
- `PUT /api/beneficiaries/:id` - Update beneficiary

### Donations
- `POST /api/donations` - Record donation
- `GET /api/donations` - List donations
- `GET /api/donations/inventory` - Get current inventory

### Distribution
- `POST /api/distribution/calculate` - Calculate equitable distribution
- `POST /api/distribution/execute` - Execute distribution
- `GET /api/distribution/history` - Distribution history

## Setup

```bash
cd backend/ngo-service
npm install
npm run dev
```

## Environment Variables

See `.env.example` in the root directory.
