# --- Stage 1: Build & Dependency Installation ---
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .


# --- Stage 2: Production Run Environment ---
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install only production dependencies to keep the image slim
RUN npm ci --only=production

# Copy application files from the builder stage
COPY --from=builder /usr/src/app/server.js ./server.js

# Expose the application port
EXPOSE 3000

# Run the app under a non-root user for AWS security best practices
USER node

CMD ["node", "server.js"]
