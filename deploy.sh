#!/bin/bash

# --- Configuration ---
APP_NAME="unicorn-commander"
COMPOSE_PROJECT_NAME="unicorn-commander"
TAG="prod-$(date +%Y%m%d%H%M%S)"
START_PORT=8081
MAX_ATTEMPTS=10

# --- Colors for output ---
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# --- Functions ---
check_status() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ $1${NC}"
  else
    echo -e "${RED}✗ $1${NC}"
    exit 1
  fi
}

find_available_port() {
  local port=$START_PORT
  local attempts=0
  
  while [ $attempts -lt $MAX_ATTEMPTS ]; do
    if ! lsof -i :$port > /dev/null; then
      echo $port
      return 0
    fi
    port=$((port + 1))
    attempts=$((attempts + 1))
  done
  
  echo -e "${RED}Error: Could not find available port in range ${START_PORT}-$((START_PORT + MAX_ATTEMPTS))${NC}"
  exit 1
}

# --- Deployment ---
echo -e "${GREEN}🚀 Starting deployment of $APP_NAME${NC}"

# Find available port
PORT=$(find_available_port)
export PORT
export NGINX_PORT=$PORT

echo -e "${GREEN}Using port: $PORT${NC}"

# Build the image
echo "Building Docker image..."
COMPOSE_PROJECT_NAME=$COMPOSE_PROJECT_NAME TAG=$TAG docker-compose build
check_status "Docker image built"

# Stop and remove existing containers
echo "Stopping and removing old containers..."
if docker ps -a --format '{{.Names}}' | grep -q "$APP_NAME"; then
  docker-compose -p $COMPOSE_PROJECT_NAME down
fi
check_status "Old containers removed"

# Start the new container
echo "Starting new container..."
COMPOSE_PROJECT_NAME=$COMPOSE_PROJECT_NAME TAG=$TAG docker-compose up -d
check_status "Container started"

# Wait for container to be ready
echo "Waiting for container to be ready..."
sleep 10

# Verify deployment
echo "Verifying deployment..."
curl_output=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT)
if [ "$curl_output" == "200" ]; then
  echo -e "${GREEN}✅ Deployment successful!${NC}"
  echo -e "${GREEN}Application is running on port $PORT${NC}"
  echo -e "${GREEN}You can point your reverse proxy to this server's IP and port $PORT${NC}"
else
  echo -e "${RED}❌ Deployment verification failed${NC}"
  echo "Container logs:"
  docker-compose -p $COMPOSE_PROJECT_NAME logs
  exit 1
fi
