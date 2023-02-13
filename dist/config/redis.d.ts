import Redis from 'ioredis';
declare const redisClient: Redis;
declare function getRedis(value: string): any;
declare function setRedis(key: string, value: string): any;
declare function delRedis(key: string): any;
export { redisClient, getRedis, setRedis, delRedis };
