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

# Function to wait for container health
wait_for_health() {
    echo "Waiting for container to be healthy..."
    RETRIES=0
    MAX_RETRIES=30
    
    while [ $RETRIES -lt $MAX_RETRIES ]; do
        if [ "$($DOCKER_COMPOSE ps --format json | grep -o '"Health": "[^"]*"' | grep -o '[^"]*$')" == "healthy" ]; then
            return 0
        fi
        echo -n "."
        sleep 2
        RETRIES=$((RETRIES+1))
    done
    
    return 1
}

# Ensure clean shutdown
cleanup() {
    echo "Cleaning up..."
    $DOCKER_COMPOSE down
    exit 1
}

trap cleanup SIGINT SIGTERM

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
if wait_for_health; then
    echo -e "${GREEN}✓ Container is healthy${NC}"
else
    echo -e "${RED}✗ Container health check failed${NC}"
    echo "Logs from container:"
    $DOCKER_COMPOSE logs
    cleanup
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
