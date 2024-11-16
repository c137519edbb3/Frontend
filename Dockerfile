# Base image for building
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy only the built application and necessary files
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/public /app/public

# Install only production dependencies
RUN npm install --frozen-lockfile --production

# Expose the production port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
