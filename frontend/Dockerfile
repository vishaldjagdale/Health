# Stage 1: Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for showcase)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Development-friendly distroless stage
FROM gcr.io/distroless/nodejs18-debian11

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 8000

# Use the correct entrypoint for distroless nodejs
ENTRYPOINT ["/nodejs/bin/node"]
CMD ["-e", "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let file=req.url==='/'?'/index.html':req.url;try{const content=fs.readFileSync('./dist'+file);const ext=path.extname(file);res.setHeader('Content-Type',ext==='.js'?'application/javascript':ext==='.css'?'text/css':ext==='.html'?'text/html':'text/plain');res.end(content)}catch{res.writeHead(404);res.end('404')}}).listen(8000,()=>console.log('Server on :8000'))"]
