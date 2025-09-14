#!/usr/bin/env node

const axios = require('axios');

const PROXY_URL = 'http://localhost:3001';
const API_KEY = process.env.REACT_APP_API_KEY || 'your-api-key-here';

async function testCache() {
  console.log('🧪 Testing Redis Cache Implementation\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${PROXY_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test 2: Cache stats
    console.log('2. Testing cache stats...');
    const statsResponse = await axios.get(`${PROXY_URL}/cache/stats`);
    console.log('✅ Cache stats:', statsResponse.data);
    console.log('');

    // Test 3: First API call (should be cache MISS)
    console.log('3. Making first API call (should be cache MISS)...');
    const start1 = Date.now();
    const firstResponse = await axios.get(`${PROXY_URL}/api/news/top-headlines`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      params: {
        country: 'gb',
        pageSize: 5
      }
    });
    const time1 = Date.now() - start1;
    console.log(`✅ First call completed in ${time1}ms`);
    console.log(`   Articles returned: ${firstResponse.data.articles?.length || 0}`);
    console.log('');

    // Test 4: Second API call (should be cache HIT)
    console.log('4. Making second API call (should be cache HIT)...');
    const start2 = Date.now();
    const secondResponse = await axios.get(`${PROXY_URL}/api/news/top-headlines`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      params: {
        country: 'gb',
        pageSize: 5
      }
    });
    const time2 = Date.now() - start2;
    console.log(`✅ Second call completed in ${time2}ms`);
    console.log(`   Articles returned: ${secondResponse.data.articles?.length || 0}`);
    console.log(`   Speed improvement: ${Math.round((time1 - time2) / time1 * 100)}%`);
    console.log('');

    // Test 5: Different parameters (should be cache MISS)
    console.log('5. Making API call with different parameters (should be cache MISS)...');
    const start3 = Date.now();
    const thirdResponse = await axios.get(`${PROXY_URL}/api/news/top-headlines`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      params: {
        country: 'us',
        pageSize: 5
      }
    });
    const time3 = Date.now() - start3;
    console.log(`✅ Third call completed in ${time3}ms`);
    console.log(`   Articles returned: ${thirdResponse.data.articles?.length || 0}`);
    console.log('');

    // Test 6: Clear cache
    console.log('6. Testing cache clear...');
    const clearResponse = await axios.delete(`${PROXY_URL}/cache/clear`);
    console.log('✅ Cache clear:', clearResponse.data);
    console.log('');

    // Test 7: API call after cache clear (should be cache MISS)
    console.log('7. Making API call after cache clear (should be cache MISS)...');
    const start4 = Date.now();
    const fourthResponse = await axios.get(`${PROXY_URL}/api/news/top-headlines`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      params: {
        country: 'gb',
        pageSize: 5
      }
    });
    const time4 = Date.now() - start4;
    console.log(`✅ Fourth call completed in ${time4}ms`);
    console.log(`   Articles returned: ${fourthResponse.data.articles?.length || 0}`);
    console.log('');

    console.log('🎉 All tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - First call (cache MISS): ${time1}ms`);
    console.log(`   - Second call (cache HIT): ${time2}ms`);
    console.log(`   - Third call (different params, cache MISS): ${time3}ms`);
    console.log(`   - Fourth call (after clear, cache MISS): ${time4}ms`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Response status:', error.response.status);
      console.error('   Response data:', error.response.data);
    }
    process.exit(1);
  }
}

// Check if API key is provided
if (!process.env.REACT_APP_API_KEY) {
  console.log('⚠️  Warning: REACT_APP_API_KEY environment variable not set');
  console.log('   Set it with: export REACT_APP_API_KEY=your-news-api-key');
  console.log('   Or the test will use a placeholder key and may fail\n');
}

testCache();
