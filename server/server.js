const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const cacheService = require('./cache-service');

dotenv.config();

const app = express();
const PORT = process.env.PROXY_PORT || 3001;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const CACHE_TTL = 30 * 60; // 30 minutes in seconds

// Enable CORS for all origins in development
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://localhost:8443']
    : true,
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', async (req, res) => {
  const redisStatus = await cacheService.ping();
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    redis: redisStatus ? 'connected' : 'disconnected'
  });
});

// Cache management endpoints (for development/testing)
app.get('/cache/stats', async (req, res) => {
  try {
    const redisStatus = await cacheService.ping();
    res.json({
      redis_connected: redisStatus,
      cache_ttl_seconds: CACHE_TTL,
      cache_ttl_minutes: CACHE_TTL / 60
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/cache/clear', async (req, res) => {
  try {
    const cleared = await cacheService.flush();
    res.json({ 
      success: cleared,
      message: cleared ? 'Cache cleared successfully' : 'Failed to clear cache'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for News API with caching
app.use('/api/news/*', async (req, res) => {
  try {
    const newsApiPath = req.path.replace('/api/news', '');
    const newsApiUrl = `${NEWS_API_BASE_URL}${newsApiPath}`;

    // Forward query parameters
    const queryString = new URLSearchParams(req.query).toString();
    const fullUrl = queryString ? `${newsApiUrl}?${queryString}` : newsApiUrl;

    // Generate cache key
    const cacheKey = cacheService.generateCacheKey(newsApiPath, req.query);

    // Only cache GET requests
    if (req.method.toLowerCase() === 'get') {
      // Try to get from cache first
      const cachedResponse = await cacheService.get(cacheKey);
      if (cachedResponse) {
        console.log(`Cache HIT for: ${fullUrl}`);
        res.status(cachedResponse.status).json(cachedResponse.data);
        return;
      }
      console.log(`Cache MISS for: ${fullUrl}`);
    }

    console.log(`Proxying request to: ${fullUrl}`);

    // Make request to News API
    const response = await axios({
      method: req.method.toLowerCase(),
      url: fullUrl,
      headers: {
        'Authorization': req.headers.authorization,
        'User-Agent': 'news-feed-app/1.0.0',
        'Accept': 'application/json'
      },
      data: req.body
    });

    // Cache successful GET responses
    if (req.method.toLowerCase() === 'get' && response.status === 200) {
      await cacheService.set(cacheKey, {
        status: response.status,
        data: response.data
      }, CACHE_TTL);
      console.log(`Cached response for: ${fullUrl} (TTL: ${CACHE_TTL}s)`);
    }

    // Forward the response
    res.status(response.status).json(response.data);

  } catch (error) {
    console.error('Proxy error:', error.message);

    if (error.response) {
      // News API returned an error
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // Network error
      res.status(503).json({
        status: 'error',
        message: 'Unable to reach News API',
        code: 'NETWORK_ERROR'
      });
    } else {
      // Other error
      res.status(500).json({
        status: 'error',
        message: 'Internal proxy server error',
        code: 'PROXY_ERROR'
      });
    }
  }
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    availableEndpoints: ['/health', '/cache/stats', '/cache/clear', '/api/news/*']
  });
});

// Initialize Redis connection and start server
async function startServer() {
  try {
    // Connect to Redis
    const redisConnected = await cacheService.connect();
    if (redisConnected) {
      console.log('✅ Redis connected successfully');
    } else {
      console.log('⚠️  Redis connection failed - caching disabled');
    }

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🚀 News API proxy server running on port ${PORT}`);
      console.log(`📊 Health check available at: http://localhost:${PORT}/health`);
      console.log(`🔄 Proxy endpoint: http://localhost:${PORT}/api/news/*`);
      console.log(`💾 Caching enabled with ${CACHE_TTL}s TTL`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(async () => {
        await cacheService.disconnect();
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(async () => {
        await cacheService.disconnect();
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();