# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies including Node.js and npm
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    curl \
    supervisor \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy frontend package.json and install Node dependencies
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend

# Install frontend dependencies (Vite will handle Tailwind installation)
RUN npm install

# Copy frontend files
COPY frontend/ ./

# Build React frontend (when needed)
# RUN npm run build

# Copy backend code
WORKDIR /app
COPY backend/ ./backend/

# Create supervisor configuration
RUN mkdir -p /etc/supervisor/conf.d/
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports for both servers
EXPOSE 5000 5173

# Start both servers using supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]