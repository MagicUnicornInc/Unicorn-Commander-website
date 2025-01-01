# Unicorn Commander Deployment Guide

This guide explains how to build and deploy the Unicorn Commander application using Docker.

## Prerequisites

- Docker
- Docker Compose
- Bash shell (for deployment script)

## Build Process

The application uses a multi-stage build process:
1. Build stage: Compiles the React application
2. Production stage: Sets up Nginx to serve the built assets

### Configuration Options

Environment variables that can be set:
- `TAG`: Docker image tag (default: latest)
- `NODE_ENV`: Node environment (default: production)

## Deployment Steps

1. **Initial Setup**
   ```bash
   # Make deploy script executable
   chmod +x deploy.sh
   ```

2. **Deploy the Application**
   ```bash
   ./deploy.sh
   ```

3. **Verify Deployment**
   ```bash
   docker-compose ps
   ```

The application will be available at `http://localhost:8080`

## Common Operations

### View Logs
```bash
docker-compose logs -f
```

### Restart Services
```bash
docker-compose restart
```

### Update Application
```bash
./deploy.sh
```

### Scale Down
```bash
docker-compose down
```

## Security Considerations

- Running as non-root user
- Security headers configured in Nginx
- Regular security updates
- Proper file permissions

## Maintenance

- Regular monitoring of container health
- Log rotation handled by Docker
- Nginx cache management
- Regular security updates

## Troubleshooting

If the health check fails:
1. Check container logs
2. Verify Nginx configuration
3. Check application build
4. Verify network connectivity

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.
