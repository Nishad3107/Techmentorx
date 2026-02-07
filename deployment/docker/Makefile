# Makefile for NGO Connect Platform

.PHONY: help build up down logs clean test

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build all Docker images
	docker-compose build

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## View logs from all services
	docker-compose logs -f

clean: ## Remove all containers, volumes, and images
	docker-compose down -v --rmi all

restart: down up ## Restart all services

ps: ## List running services
	docker-compose ps

# Development commands
dev-backend: ## Start backend services only
	docker-compose up -d postgres mongodb redis ngo-service content-filtration-service api-gateway

dev-frontend: ## Run frontend in development mode
	cd ../../frontend/web-app && npm run dev

# Database commands
db-migrate: ## Run database migrations
	docker-compose exec ngo-service npm run migrate

db-seed: ## Seed database with sample data
	docker-compose exec ngo-service npm run seed

# Testing
test-backend: ## Run backend tests
	docker-compose exec ngo-service npm test
	docker-compose exec content-filtration-service pytest

test-all: ## Run all tests
	$(MAKE) test-backend

# Production
prod-deploy: ## Deploy to production (use with caution)
	kubectl apply -f ../kubernetes/
