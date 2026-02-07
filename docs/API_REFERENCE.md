# API Reference

Complete API reference for NGO Connect Platform.

## Base URLs

- **Development**: `http://localhost:8080`
- **Staging**: `https://staging-api.ngoconnect.org`
- **Production**: `https://api.ngoconnect.org`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## NGO Service API

### Authentication Endpoints

#### POST /api/ngo/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "ngo_admin",
  "ngoId": "optional-ngo-uuid"
}
```

#### POST /api/ngo/auth/login
Login user.

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "ngo_admin"
  }
}
```

### NGO Endpoints

#### GET /api/ngo/ngos
List all NGOs with pagination.

**Query Parameters:**
- `city`: Filter by city
- `isVerified`: Filter by verification status
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

#### POST /api/ngo/ngos
Create new NGO (Admin only).

### Beneficiary Endpoints

#### GET /api/ngo/beneficiaries
List beneficiaries.

#### POST /api/ngo/beneficiaries
Register new beneficiary.

### Distribution Endpoints

#### POST /api/ngo/distribution/calculate
Calculate fair distribution plan.

## Content Filtration Service API

### Content Analysis

#### POST /api/content/analyze
Analyze content for safety.

**Request:**
```json
{
  "content": "Text to analyze",
  "content_type": "text"
}
```

**Response:**
```json
{
  "content_id": "uuid",
  "toxicity": {
    "overall_score": 0.15,
    "is_toxic": false,
    "severity": "low"
  },
  "is_safe": true
}
```

For complete API documentation, visit the interactive docs at `/docs`.
