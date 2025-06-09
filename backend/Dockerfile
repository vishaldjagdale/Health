# Stage 1: Build stage
FROM node:18-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .
RUN mkdir -p uploads

# Create the missing test directory and a dummy PDF file
RUN mkdir -p /app/test/data
RUN echo "%PDF-1.4" > /app/test/data/05-versions-space.pdf

# Stage 2: Distroless 
FROM gcr.io/distroless/nodejs18-debian11

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

# Fix: Don't specify ENTRYPOINT, just use CMD with the JavaScript file
CMD ["server.js"]