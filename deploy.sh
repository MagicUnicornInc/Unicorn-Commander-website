#!/bin/bash

# --- Configuration ---
APP_NAME="unicorn-commander"
COMPOSE_PROJECT_NAME="unicorn-commander"
GITHUB_REPO="https://github.com/yourusername/your-repo.git" # Replace with your repo
REMOTE_HOST="your_server_ip_or_domain" # Replace with your server address
REMOTE_USER="your_user" # Replace with your server username
REMOTE_DIR="/opt/unicorn-commander" # Customize deployment directory
SSH_KEY="~/.ssh/id_rsa" # Customize SSH key path
TAG="prod-$(date +%Y%m%d%H%M%S)"

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

wait_for_health() {
  echo "Waiting for container to be healthy..."
  RETRIES=0
  MAX_RETRIES=30

  while [ $RETRIES -lt $MAX_RETRIES ]; do
    HEALTH_STATUS=$(ssh -i $SSH_KEY -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST "docker inspect --format='{{json .State.Health}}' $APP_NAME")
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

echo -e "${GREEN}🚀 Deploying $APP_NAME to $REMOTE_HOST${NC}"

# --- 1. Prepare remote server ---
echo -e "${GREEN}--- Preparing remote server ---${NC}"
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST << EOF
  # Update system
  sudo apt-get update -y || true
  sudo apt-get upgrade -y || true

  # Install Docker if not present
  if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $REMOTE_USER
    rm get-docker.sh
  fi

  # Install Docker Compose if not present
  if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
  fi

  # Create application directory if it doesn't exist
  mkdir -p $REMOTE_DIR
EOF
check_status "Remote server prepared"

# --- 2. Transfer files ---
echo -e "${GREEN}--- Transferring files ---${NC}"
rsync -avz -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" --exclude='.git' --exclude='node_modules' . $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR
check_status "Files transferred"

# --- 3. Build and deploy ---
echo -e "${GREEN}--- Building and deploying ---${NC}"
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST << EOF
  cd $REMOTE_DIR

  # Build the image
  echo "Building Docker image..."
  docker build -t $APP_NAME:$TAG .
  
  # Stop and remove existing containers and images
  echo "Stopping and removing old containers and images..."
  if docker ps -a --format '{{.Names}}' | grep -q "$COMPOSE_PROJECT_NAME"; then
    docker-compose -p $COMPOSE_PROJECT_NAME down
  fi
  if docker images -q $APP_NAME:latest 2> /dev/null; then
    docker rmi $APP_NAME:latest
  fi

  # Start the new container
  echo "Starting new container..."
  COMPOSE_PROJECT_NAME=$COMPOSE_PROJECT_NAME TAG=$TAG docker-compose up -d

  # Wait for health check
  if wait_for_health; then
    echo -e "${GREEN}✓ Container is healthy${NC}"
  else
    echo -e "${RED}✗ Container health check failed${NC}"
    echo "Logs from container:"
    docker-compose -p $COMPOSE_PROJECT_NAME logs
    exit 1
  fi
EOF

check_status "Deployment completed"

echo -e "${GREEN}✅ Application deployed successfully!${NC}"
echo "Access the application via your server's IP or domain, pointing your reverse proxy to the appropriate port."
