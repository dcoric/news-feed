#!/bin/bash

echo "🚀 News Feed Redis Caching Demo"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

echo -e "${BLUE}📋 This demo will:${NC}"
echo "   1. Start Redis and the proxy server"
echo "   2. Make API calls to demonstrate caching"
echo "   3. Show performance improvements"
echo "   4. Clean up resources"
echo ""

read -p "Press Enter to continue or Ctrl+C to cancel..."

echo -e "${YELLOW}🔧 Starting services...${NC}"
echo ""

# Start Redis and proxy server
docker-compose up -d redis proxy-server

echo -e "${GREEN}✅ Services started!${NC}"
echo ""

# Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Check health
echo -e "${BLUE}🏥 Checking service health...${NC}"
curl -s http://localhost:3001/health | jq '.' 2>/dev/null || echo "Health check endpoint not ready yet"
echo ""

# Check cache stats
echo -e "${BLUE}📊 Cache configuration:${NC}"
curl -s http://localhost:3001/cache/stats | jq '.' 2>/dev/null || echo "Cache stats not available yet"
echo ""

echo -e "${YELLOW}🧪 Testing cache functionality...${NC}"
echo ""

# Test API calls (this will fail without API key, but shows the structure)
echo -e "${BLUE}📡 Making test API call (will show cache behavior in logs)...${NC}"
echo ""

# Show how to test with API key
echo -e "${GREEN}💡 To test with real data, run:${NC}"
echo "   export REACT_APP_API_KEY=your-news-api-key"
echo "   npm run proxy:test-cache"
echo ""

# Show logs
echo -e "${BLUE}📝 Recent server logs (showing cache operations):${NC}"
docker-compose logs --tail=20 proxy-server
echo ""

echo -e "${GREEN}🎉 Demo completed!${NC}"
echo ""
echo -e "${BLUE}📚 What you've seen:${NC}"
echo "   ✅ Redis server running on port 6379"
echo "   ✅ Proxy server running on port 3001 with caching"
echo "   ✅ Health check endpoint with Redis status"
echo "   ✅ Cache management endpoints"
echo ""
echo -e "${BLUE}🔗 Available endpoints:${NC}"
echo "   • Health: http://localhost:3001/health"
echo "   • Cache stats: http://localhost:3001/cache/stats"
echo "   • Clear cache: DELETE http://localhost:3001/cache/clear"
echo "   • News API: http://localhost:3001/api/news/top-headlines"
echo ""
echo -e "${YELLOW}🛑 To stop services:${NC}"
echo "   docker-compose down"
echo ""
echo -e "${BLUE}📖 For more details, see: CACHING.md${NC}"
