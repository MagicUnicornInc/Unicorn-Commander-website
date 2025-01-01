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

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add non-root user
RUN adduser -D -H -u 1001 -G www-data www-data

# Set permissions
RUN chown -R www-data:www-data /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R www-data:www-data /var/cache/nginx && \
    chown -R www-data:www-data /var/log/nginx && \
    chown -R www-data:www-data /etc/nginx/conf.d

# Switch to non-root user
USER www-data

EXPOSE 8080

# Use nginx's daemon-off option to run in foreground
CMD ["nginx", "-g", "daemon off;"]
