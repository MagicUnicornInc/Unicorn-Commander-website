#!/bin/bash

# Configuration
APP_NAME="unicorn-commander"
DOCKER_COMPOSE="docker-compose"
TAG=$(date +%Y%m%d_%H%M%S)

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Function to check if command succeeded
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1${NC}"
    else
        echo -e "${RED}✗ $1${NC}"
        exit 1
    fi
}

# Build and deploy
echo "🚀 Deploying $APP_NAME..."

# Build new image
echo "Building Docker image..."
$DOCKER_COMPOSE build --no-cache
check_status "Build completed"

# Tag the image
echo "Tagging image..."
$DOCKER_COMPOSE build --build-arg TAG=$TAG
check_status "Image tagged as $TAG"

# Stop existing container
echo "Stopping existing container..."
$DOCKER_COMPOSE down
check_status "Existing container stopped"

# Start new container
echo "Starting new container..."
TAG=$TAG $DOCKER_COMPOSE up -d
check_status "New container started"

# Wait for health check
echo "Waiting for health check..."
sleep 10
HEALTH_STATUS=$($DOCKER_COMPOSE ps | grep $APP_NAME | grep "healthy" || echo "unhealthy")
if [[ $HEALTH_STATUS == *"healthy"* ]]; then
    echo -e "${GREEN}✓ Container is healthy${NC}"
else
    echo -e "${RED}✗ Container health check failed${NC}"
    echo "Logs from container:"
    $DOCKER_COMPOSE logs
    exit 1
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
