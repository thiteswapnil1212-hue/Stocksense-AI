import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;
let redisDisabled = false;

function getRedisClient(): Redis | null {
  if (redisDisabled) {
    return null;
  }

  if (redisClient) {
    return redisClient;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn(
      "Redis disabled - UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN missing"
    );
    redisDisabled = true;
    return null;
  }

  redisClient = new Redis({
    url,
    token,
  });

  return redisClient;
}

export async function getCachedValue<T>(
  key: string
): Promise<T | null> {
  const redis = getRedisClient();

  if (!redis) {
    return null;
  }

  try {
    return (await redis.get(key)) as T | null;
  } catch (error) {
    console.error("Redis GET error:", error);
    return null;
  }
}

export async function setCachedValue<T>(
  key: string,
  value: T,
  ttlSeconds: number
): Promise<void> {
  const redis = getRedisClient();

  if (!redis) {
    return;
  }

  try {
    await redis.set(key, value, {
      ex: ttlSeconds,
    });
  } catch (error) {
    console.error("Redis SET error:", error);
  }
}

export async function cacheValue<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = await getCachedValue<T>(key);

  if (cached !== null) {
    return cached;
  }

  const value = await fetcher();

  await setCachedValue(
    key,
    value,
    ttlSeconds
  );

  return value;
}