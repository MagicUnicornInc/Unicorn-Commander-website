#!/bin/bash

# --- Configuration ---
APP_NAME="unicorn-commander"
COMPOSE_PROJECT_NAME="unicorn-commander"
TAG="prod-$(date +%Y%m%d%H%M%S)"

# --- Colors for output ---
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# --- Port Configuration ---
read -p "Enter port number (default: 8080): " PORT
PORT=${PORT:-8080}

# Validate port number
if ! [[ "$PORT" =~ ^[0-9]+$ ]] || [ "$PORT" -lt 1 ] || [ "$PORT" -gt 65535 ]; then
  echo -e "${RED}Invalid port number. Using default port 8080.${NC}"
  PORT=8080
fi

# Export port for docker-compose
export PORT

# --- Functions ---
check_status() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ $1${NC}"
  else
    echo -e "${RED}✗ $1${NC}"
    exit 1
  fi
}

wait_for_health() {
  echo "Waiting for container to be healthy..."
  RETRIES=0
  MAX_RETRIES=30

  while [ $RETRIES -lt $MAX_RETRIES ]; do
    HEALTH_STATUS=$(docker inspect --format='{{json .State.Health}}' $APP_NAME)
    if [[ $HEALTH_STATUS == *"\"Status\":\"healthy\""* ]]; then
      return 0
    fi
    echo -n "."
    sleep 2
    RETRIES=$((RETRIES+1))
  done

  return 1
}

# --- Deployment ---
echo -e "${GREEN}🚀 Deploying $APP_NAME on port $PORT${NC}"

# Update nginx configuration with the custom port
sed "s/listen 8080/listen $PORT/" nginx.conf > nginx.custom.conf
mv nginx.custom.conf nginx.conf

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

# Wait for health check
if wait_for_health; then
  echo -e "${GREEN}✓ Container is healthy${NC}"
else
  echo -e "${RED}✗ Container health check failed${NC}"
  echo "Logs from container:"
  docker-compose -p $COMPOSE_PROJECT_NAME logs
  exit 1
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo "The application is now running on port $PORT"
echo "Point your reverse proxy to localhost:$PORT"
