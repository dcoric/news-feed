# News API Proxy Server Setup

This document explains how to set up and use the local proxy server to bypass CORS issues with the News API.

## Quick Start

### Option 1: Using Docker (Recommended)

1. **Install proxy server dependencies:**
   ```bash
   npm run proxy:install
   ```

2. **Start only the proxy server:**
   ```bash
   npm run docker:proxy
   ```

3. **Or start both proxy and React app:**
   ```bash
   npm run docker:dev
   ```

### Option 2: Local Development

1. **Install proxy dependencies:**
   ```bash
   npm run proxy:install
   ```

2. **Start proxy and React app concurrently:**
   ```bash
   npm run dev:with-proxy
   ```

3. **Or run them separately:**
   ```bash
   # Terminal 1
   npm run proxy:dev

   # Terminal 2
   npm start
   ```

## Configuration

### Environment Variables

Create a `.env` file in the project root:
```env
SASS_PATH=./node_modules;./src
HTTPS=true
PORT=8443
REACT_APP_API_KEY=your_newsapi_key_here
REACT_APP_PROXY_URL=http://localhost:3001
```

### Docker Configuration

The `docker-compose.yml` includes:
- **proxy-server**: Runs on port 3001
- **web**: React app on port 8443 (optional, use profile `full-stack`)

## Proxy Server Endpoints

- **Health Check**: `GET /health`
- **News API Proxy**: `GET /api/news/*`

## Development Scripts

- `npm run proxy:install` - Install proxy server dependencies
- `npm run proxy:dev` - Start proxy in development mode with nodemon
- `npm run proxy:start` - Start proxy in production mode
- `npm run docker:proxy` - Start only proxy server with Docker
- `npm run docker:dev` - Start full stack with Docker
- `npm run docker:build` - Build Docker images
- `npm run dev:with-proxy` - Start both proxy and React app locally

## How It Works

1. The proxy server receives requests at `/api/news/*`
2. It forwards them to `https://newsapi.org/v2/*`
3. It adds proper CORS headers for local development
4. The React app makes requests to the local proxy instead of directly to News API

## Benefits

- ✅ No reliance on external CORS proxy services
- ✅ Better control over request/response handling
- ✅ Local development environment isolation
- ✅ Docker support for consistent deployment
- ✅ Health checks and error handling