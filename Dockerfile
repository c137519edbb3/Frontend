FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .env* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 80

# Start the application
CMD ["npm", "start"]