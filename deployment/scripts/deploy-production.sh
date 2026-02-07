#!/bin/bash

# Production deployment script for NGO Connect Platform
# Use with caution - ensure you have proper backups

set -e

echo "==================================="
echo "Production Deployment"
echo "==================================="

# Check if kubectl is configured
if ! kubectl cluster-info &> /dev/null; then
    echo "Error: kubectl is not configured or cluster is not accessible"
    exit 1
fi

# Confirm deployment
read -p "Are you sure you want to deploy to PRODUCTION? (yes/no) " -r
echo
if [[ ! $REPLY =~ ^yes$ ]]; then
    echo "Deployment cancelled"
    exit 0
fi

echo ""
echo "Applying Kubernetes configurations..."

# Create namespace
kubectl create namespace ngo-platform --dry-run=client -o yaml | kubectl apply -f -

# Apply secrets (ensure they exist)
if [ -f "../kubernetes/secrets.yaml" ]; then
    kubectl apply -f ../kubernetes/secrets.yaml -n ngo-platform
else
    echo "Warning: secrets.yaml not found. Please create it before deployment."
fi

# Deploy databases
echo "Deploying databases..."
kubectl apply -f ../kubernetes/postgres-deployment.yaml -n ngo-platform
kubectl apply -f ../kubernetes/mongodb-deployment.yaml -n ngo-platform
kubectl apply -f ../kubernetes/redis-deployment.yaml -n ngo-platform

# Wait for databases to be ready
echo "Waiting for databases to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres -n ngo-platform --timeout=300s
kubectl wait --for=condition=ready pod -l app=mongodb -n ngo-platform --timeout=300s
kubectl wait --for=condition=ready pod -l app=redis -n ngo-platform --timeout=300s

# Deploy services
echo "Deploying application services..."
kubectl apply -f ../kubernetes/ngo-service-deployment.yaml -n ngo-platform
kubectl apply -f ../kubernetes/content-service-deployment.yaml -n ngo-platform
kubectl apply -f ../kubernetes/api-gateway-deployment.yaml -n ngo-platform

# Wait for deployments
echo "Waiting for deployments to be ready..."
kubectl rollout status deployment/ngo-service -n ngo-platform
kubectl rollout status deployment/content-filtration-service -n ngo-platform
kubectl rollout status deployment/api-gateway -n ngo-platform

echo ""
echo "==================================="
echo "Deployment completed successfully!"
echo "==================================="
echo ""
echo "Service endpoints:"
kubectl get services -n ngo-platform
