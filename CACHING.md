# Redis Caching Implementation

This document describes the Redis caching implementation added to the news-feed project to reduce API calls and improve performance.

## Overview

The caching system uses Redis to store News API responses for 30 minutes, significantly reducing the number of external API calls and improving response times.

## Architecture

```
Frontend (React) → Proxy Server (Express) → Redis Cache → News API
                                    ↓
                              Cache Hit/Miss Logic
```

## Features

- **30-minute TTL**: News responses are cached for 30 minutes (1800 seconds)
- **Smart cache keys**: Based on API endpoint and query parameters
- **Cache hit/miss logging**: Detailed logging for debugging
- **Graceful fallback**: If Redis is unavailable, requests proceed without caching
- **Health monitoring**: Redis connection status in health checks
- **Cache management**: Endpoints to view stats and clear cache

## Redis Configuration

### Environment Variables

- `REDIS_URL`: Redis connection URL (default: `redis://localhost:6379`)
- `CACHE_TTL`: Cache time-to-live in seconds (default: 1800 = 30 minutes)

### Docker Setup

Redis is included in the Docker Compose configuration:

```yaml
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
  command: redis-server --appendonly yes
  volumes:
    - redis_data:/data
```

## API Endpoints

### Cache Management

- `GET /health` - Health check with Redis status
- `GET /cache/stats` - Cache statistics and configuration
- `DELETE /cache/clear` - Clear all cached data

### Example Responses

**Health Check:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "redis": "connected"
}
```

**Cache Stats:**
```json
{
  "redis_connected": true,
  "cache_ttl_seconds": 1800,
  "cache_ttl_minutes": 30
}
```

## Cache Key Strategy

Cache keys are generated using:
- API endpoint path
- Query parameters (sorted alphabetically)
- Base64 encoded for safe storage

Example: `news:top-headlines?country=gb&pagesize=5` → `news:dG9wLWhlYWRsaW5lcz9jb3VudHJ5PWdiJnBhZ2VzaXplPTU=`

## Performance Benefits

- **Reduced API calls**: Identical requests within 30 minutes are served from cache
- **Faster response times**: Cache hits are typically 10-50x faster than API calls
- **Rate limit protection**: Reduces News API rate limit consumption
- **Offline resilience**: Cached data available even if News API is temporarily down

## Testing

### Manual Testing

1. Start the services:
   ```bash
   # Using Docker
   docker-compose up redis proxy-server
   
   # Or locally
   npm run proxy:dev
   ```

2. Run the cache test:
   ```bash
   npm run proxy:test-cache
   ```

### Test Scenarios

The test script verifies:
- Health check functionality
- Cache miss on first request
- Cache hit on identical second request
- Different parameters create separate cache entries
- Cache clear functionality
- Performance improvements

## Monitoring

### Logs

The server logs cache operations:
- `Cache HIT for: [URL]` - Response served from cache
- `Cache MISS for: [URL]` - Response fetched from API
- `Cached response for: [URL] (TTL: 1800s)` - Response stored in cache

### Health Checks

Monitor Redis connection status:
```bash
curl http://localhost:3001/health
```

## Configuration

### TTL Adjustment

To change the cache duration, modify the `CACHE_TTL` constant in `server/server.js`:

```javascript
const CACHE_TTL = 30 * 60; // 30 minutes in seconds
```

### Redis Settings

Redis configuration can be adjusted in `docker-compose.yml`:

```yaml
redis:
  image: redis:7-alpine
  command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
```

## Troubleshooting

### Redis Connection Issues

1. Check Redis is running:
   ```bash
   docker-compose ps redis
   ```

2. Test Redis connection:
   ```bash
   docker-compose exec redis redis-cli ping
   ```

3. Check logs:
   ```bash
   docker-compose logs redis
   docker-compose logs proxy-server
   ```

### Cache Not Working

1. Verify Redis connection in health check
2. Check cache stats endpoint
3. Review server logs for cache operations
4. Ensure API key is valid

### Performance Issues

1. Monitor cache hit/miss ratio
2. Check Redis memory usage
3. Verify TTL settings
4. Review cache key generation

## Security Considerations

- Redis is only accessible within the Docker network
- Cache keys don't expose sensitive information
- API keys are not cached
- Cache can be cleared via management endpoint

## Future Enhancements

Potential improvements:
- Cache warming strategies
- Selective cache invalidation
- Cache analytics and metrics
- Distributed caching for multiple instances
- Cache compression for large responses
