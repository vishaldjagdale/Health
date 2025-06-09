# Stage 1: Build stage
FROM node:18-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .
RUN mkdir -p uploads

# Remove bcrypt (we're using bcryptjs)
RUN npm uninstall bcrypt

# Stage 2: Distroless 
FROM gcr.io/distroless/nodejs18-debian11

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["server.js"]