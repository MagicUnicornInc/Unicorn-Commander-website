# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Accept port as build argument
ARG PORT=8080
ENV PORT=$PORT

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create necessary directories with correct permissions
RUN mkdir -p /var/cache/nginx /var/run/nginx /var/log/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx /var/log/nginx /usr/share/nginx/html /etc/nginx/conf.d && \
    chmod -R 755 /var/cache/nginx /var/run/nginx /var/log/nginx /usr/share/nginx/html && \
    # Update main nginx.conf to include mime.types and conf.d
    echo 'pid /var/run/nginx/nginx.pid;' > /etc/nginx/nginx.conf && \
    echo 'events { worker_connections 1024; }' >> /etc/nginx/nginx.conf && \
    echo 'http { include /etc/nginx/mime.types; include /etc/nginx/conf.d/*.conf; }' >> /etc/nginx/nginx.conf

# Switch to non-root user
USER nginx

EXPOSE ${PORT}

# Use nginx's daemon-off option to run in foreground
CMD ["nginx", "-g", "daemon off;"]
