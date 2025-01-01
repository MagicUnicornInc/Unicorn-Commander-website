```markdown
# Unicorn Commander Deployment Guide

This guide explains how to build and deploy the Unicorn Commander application using Docker.

## Prerequisites

- Docker
- Docker Compose
- Bash shell (for deployment script)
- SSH access to your remote server
- Git

## Build Process

The application uses a multi-stage build process:

1. **Build stage**: Compiles the React application.
2. **Production stage**: Sets up Nginx to serve the built assets.

## Deployment Steps

1. **Initial Setup**

    -   Clone the repository to your local machine:
    
    ```bash
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```
    
    -   Make the deploy script executable:
    
    ```bash
    chmod +x deploy.sh
    ```

2. **Deploy the Application**
    -   Run the deployment script:
    ```bash
    ./deploy.sh
    ```
    -   The script will:
        1. Prepare your remote server (install Docker, Docker Compose if not present).
        2. Transfer the necessary files to your server.
        3. Build the Docker image.
        4. Stop any existing containers.
        5. Start the new container.
        6. Perform a health check.

3. **Verify Deployment**
    -   Check the container status on your server:
    ```bash
    docker ps
    ```

## Configuration Options

-   **Environment Variables**:
    -   `TAG`: Docker image tag (default: `prod-YYYYMMDDHHMMSS`)
    -   `NODE_ENV`: Node environment (default: `production`)
-   **Deployment Variables**:
    -   `APP_NAME`: Application name (default: `unicorn-commander`)
    -   `COMPOSE_PROJECT_NAME`: Docker Compose project name (default: `unicorn-commander`)
    -   `GITHUB_REPO`: Your GitHub repository URL
    -   `REMOTE_HOST`: Your server's IP address or domain name
    -   `REMOTE_USER`: Your server username
    -   `REMOTE_DIR`: Deployment directory on the server (default: `/opt/unicorn-commander`)
    -   `SSH_KEY`: Path to your SSH private key (default: `~/.ssh/id_rsa`)

## Common Operations

### View Logs

```bash
docker-compose -p unicorn-commander logs -f
```

### Restart Services

```bash
docker-compose -p unicorn-commander restart
```

### Update Application

```bash
./deploy.sh
```

### Scale Down

```bash
docker-compose -p unicorn-commander down
```

## Security Considerations

-   Running as non-root user
-   Security headers configured in Nginx
-   Regular security updates
-   Proper file permissions

## Maintenance

-   Regular monitoring of container health
-   Log rotation handled by Docker
-   Nginx cache management
-   Regular security updates

## Troubleshooting

If the health check fails:

1. Check container logs: `docker-compose -p unicorn-commander logs`
2. Verify Nginx configuration.
3. Check application build.
4. Verify network connectivity.

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.
```
