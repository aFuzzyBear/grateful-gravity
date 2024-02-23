# Use an official Node.js runtime as a parent image, buster variant for Puppeteer dependencies
FROM node:20-buster-slim

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies including Astro and Puppeteer
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build the Astro project (for production)
# Comment this line for development; uncomment for production
# RUN npm run build

# Expose the port Astro uses
EXPOSE 3000

# Use a non-root user for security
RUN groupadd -r appuser && useradd -m -r -g appuser appuser
USER appuser

# Set the command to start your app (change this depending on your app's start command)
CMD ["npm", "start"]
