import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    if (times > 3) {
      console.log('Redis connection failed after 3 attempts. Running without cache.');
      return null; // Stop retrying
    }
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  lazyConnect: true
});

let isConnected = false;

redis.on('connect', () => {
  isConnected = true;
  console.log('Redis connected successfully');
});

redis.on('error', (err) => {
  isConnected = false;
  console.error('Redis connection error:', err.message);
});

// Try to connect
redis.connect().catch(() => {
  console.log('Redis unavailable. Running without cache.');
});

// Wrapper functions that handle Redis being unavailable
const safeRedis = {
  async get(key) {
    if (!isConnected) return null;
    try {
      return await redis.get(key);
    } catch (err) {
      console.error('Redis get error:', err.message);
      return null;
    }
  },
  
  async setex(key, seconds, value) {
    if (!isConnected) return;
    try {
      await redis.setex(key, seconds, value);
    } catch (err) {
      console.error('Redis setex error:', err.message);
    }
  },
  
  async del(...keys) {
    if (!isConnected) return;
    try {
      await redis.del(...keys);
    } catch (err) {
      console.error('Redis del error:', err.message);
    }
  }
};

export default safeRedis;
