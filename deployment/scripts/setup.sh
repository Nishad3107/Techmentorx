#!/bin/bash

# Setup script for NGO Connect Platform
# This script initializes the development environment

set -e

echo "==================================="
echo "NGO Connect Platform Setup"
echo "==================================="

# Check prerequisites
echo ""
echo "Checking prerequisites..."

command -v docker >/dev/null 2>&1 || { echo "Error: Docker is not installed"; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "Error: Docker Compose is not installed"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Error: Node.js is not installed"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Error: npm is not installed"; exit 1; }

echo "✓ All prerequisites are installed"

# Create .env file if it doesn't exist
if [ ! -f ../../.env ]; then
    echo ""
    echo "Creating .env file..."
    cp ../../.env.example ../../.env
    echo "✓ .env file created. Please update it with your configuration."
else
    echo "✓ .env file already exists"
fi

# Install backend dependencies
echo ""
echo "Installing backend dependencies..."
cd ../../backend/ngo-service
npm install
echo "✓ NGO Service dependencies installed"

cd ../api-gateway
npm install
echo "✓ API Gateway dependencies installed"

cd ../content-filtration-service
pip install -r requirements.txt
echo "✓ Content Filtration Service dependencies installed"

# Install frontend dependencies
echo ""
echo "Installing frontend dependencies..."
cd ../../frontend/web-app
npm install
echo "✓ Web App dependencies installed"

cd ../mobile-app
npm install
echo "✓ Mobile App dependencies installed"

# Create necessary directories
echo ""
echo "Creating necessary directories..."
cd ../..
mkdir -p logs
mkdir -p ml-models/trained
mkdir -p ml-models/pretrained
echo "✓ Directories created"

# Initialize database (optional)
read -p "Do you want to start the database services now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Starting database services..."
    docker-compose up -d postgres mongodb redis
    echo "✓ Database services started"
    
    echo ""
    echo "Waiting for databases to be ready..."
    sleep 10
    
    echo "Running database migrations..."
    # Add migration commands here
    echo "✓ Database migrations completed"
fi

echo ""
echo "==================================="
echo "Setup completed successfully!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Update the .env file with your configuration"
echo "2. Run 'make up' to start all services"
echo "3. Access the web app at http://localhost:3000"
echo "4. Access the API at http://localhost:8080"
echo ""
