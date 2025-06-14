# Build stage
FROM node:24.2.0-alpine3.22 AS build

# Enable corepack for pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package files for better caching
COPY node/package.json ./

# Install dependencies
RUN pnpm install --prod

# Copy application code
COPY node/server.js ./

# Final stage
FROM node:24.2.0-alpine3.22 AS final

# Enable corepack for pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy installed node_modules from build stage
COPY --from=build /app/node_modules ./node_modules

# Copy application code from build stage
COPY --from=build /app/server.js ./
COPY --from=build /app/package.json ./

# Switch to unprivileged user (UID 65534)
USER 65534:65534

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["node", "server.js"]
