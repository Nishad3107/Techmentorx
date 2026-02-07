# Getting Started with NGO Connect Platform

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (v20.10+) and **Docker Compose** (v2.0+)
- **Node.js** (v18+) and **npm** (v9+)
- **Python** (v3.11+) and **pip**
- **Git**

### Optional Tools
- **kubectl** (for Kubernetes deployment)
- **Postman** or **curl** (for API testing)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ngo-connect-platform
```

### 2. Run Setup Script

```bash
cd deployment/scripts
chmod +x setup.sh
./setup.sh
```

This script will:
- Check prerequisites
- Create `.env` file from template
- Install all dependencies
- Create necessary directories
- Optionally start database services

### 3. Configure Environment

Edit the `.env` file in the root directory with your configuration:

```bash
# Database
POSTGRES_USER=ngo_user
POSTGRES_PASSWORD=your_secure_password
MONGO_USER=mongo_user
MONGO_PASSWORD=your_secure_password

# Security
JWT_SECRET=your_jwt_secret_key_here
ENCRYPTION_KEY=your_32_character_encryption_key

# APIs (optional)
PERSPECTIVE_API_KEY=your_perspective_api_key
```

### 4. Start All Services

```bash
# Using Docker Compose
docker-compose up -d

# Or using Makefile
cd deployment/docker
make up
```

### 5. Verify Services

Check if all services are running:

```bash
docker-compose ps
```

You should see:
- ✅ postgres (Port 5432)
- ✅ mongodb (Port 27017)
- ✅ redis (Port 6379)
- ✅ ngo-service (Port 3001)
- ✅ content-filtration-service (Port 8000)
- ✅ api-gateway (Port 8080)

### 6. Access the Application

- **Web App**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **NGO Service**: http://localhost:3001
- **Content Service**: http://localhost:8000

## Development Workflow

### Backend Development

#### NGO Service (Node.js)

```bash
cd backend/ngo-service
npm run dev
```

The service will run with hot-reloading at http://localhost:3001

#### Content Filtration Service (Python)

```bash
cd backend/content-filtration-service
python src/main.py
```

The service will run at http://localhost:8000

### Frontend Development

#### Web Application

```bash
cd frontend/web-app
npm run dev
```

The app will be available at http://localhost:3000

#### Mobile Application

```bash
cd frontend/mobile-app
npm start
```

This will start Expo Dev Tools. You can:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app

## Testing

### Run All Tests

```bash
cd deployment/docker
make test-all
```

### Individual Service Tests

#### Backend Tests
```bash
# NGO Service
cd backend/ngo-service
npm test

# Content Filtration Service
cd backend/content-filtration-service
pytest
```

#### Frontend Tests
```bash
# Web App
cd frontend/web-app
npm test
```

## Database Management

### Run Migrations

```bash
cd backend/ngo-service
npm run migrate
```

### Seed Sample Data

```bash
npm run seed
```

### Access Database

#### PostgreSQL
```bash
docker-compose exec postgres psql -U ngo_user -d ngo_platform
```

#### MongoDB
```bash
docker-compose exec mongodb mongosh -u mongo_user
```

## API Documentation

### View API Docs

- **NGO Service**: http://localhost:3001/api-docs
- **Content Service**: http://localhost:8000/docs

### Example API Calls

#### Register an NGO
```bash
curl -X POST http://localhost:8080/api/ngo/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@testngo.org",
    "password": "securepassword123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "ngo_admin"
  }'
```

#### Analyze Content
```bash
curl -X POST http://localhost:8080/api/content/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is a sample text to analyze",
    "content_type": "text"
  }'
```

## Troubleshooting

### Services Won't Start

1. Check if ports are already in use:
```bash
lsof -i :3001  # NGO Service
lsof -i :8000  # Content Service
lsof -i :8080  # API Gateway
```

2. View service logs:
```bash
docker-compose logs -f <service-name>
```

### Database Connection Issues

1. Ensure databases are running:
```bash
docker-compose ps postgres mongodb redis
```

2. Check database logs:
```bash
docker-compose logs postgres
```

### Frontend Build Errors

1. Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Check Node.js version:
```bash
node --version  # Should be v18+
```

## Common Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop all services
docker-compose down

# Clean everything (including volumes)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache
```

## Next Steps

1. Read the [Architecture Documentation](./ARCHITECTURE.md)
2. Explore the [API Documentation](http://localhost:8080/api-docs)
3. Check out the [Contributing Guide](./CONTRIBUTING.md)
4. Review [Security Best Practices](./SECURITY.md)

## Support

For issues or questions:
- Create an issue in the repository
- Check existing documentation
- Contact the development team

## License

This project is licensed under the MIT License - see the LICENSE file for details.
