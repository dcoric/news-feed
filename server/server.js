const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PROXY_PORT || 3001;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Enable CORS for all origins in development
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://localhost:8443']
    : true,
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Proxy endpoint for News API
app.use('/api/news/*', async (req, res) => {
  try {
    const newsApiPath = req.path.replace('/api/news', '');
    const newsApiUrl = `${NEWS_API_BASE_URL}${newsApiPath}`;

    // Forward query parameters
    const queryString = new URLSearchParams(req.query).toString();
    const fullUrl = queryString ? `${newsApiUrl}?${queryString}` : newsApiUrl;

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
    availableEndpoints: ['/health', '/api/news/*']
  });
});

app.listen(PORT, () => {
  console.log(`News API proxy server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
  console.log(`Proxy endpoint: http://localhost:${PORT}/api/news/*`);
});