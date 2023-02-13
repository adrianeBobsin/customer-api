import { BadGatewayException } from '@nestjs/common';
import Redis from 'ioredis';
import { promisify } from 'util';

const redisClient = new Redis();

function getRedis(value: string) {
  try {
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
  } catch (e) {
    throw new BadGatewayException('cache indisponível.');
  }
}

function setRedis(key: string, value: string) {
  try {
    const syncRedisSet = promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key, value);
  } catch (e) {
    throw new BadGatewayException('cache indisponível.');
  }
}

function delRedis(key: string) {
  try {
    const syncRedisDel = promisify(redisClient.del).bind(redisClient);
    return syncRedisDel(key);
  } catch (e) {
    throw new BadGatewayException('cache indisponível.');
  }
}

export { redisClient, getRedis, setRedis, delRedis };
