"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConfig = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const util_1 = require("util");
const redisClient = new ioredis_1.default();
class RedisConfig {
    async getCache(value) {
        try {
            const syncRedisGet = (0, util_1.promisify)(redisClient.get).bind(redisClient);
            return syncRedisGet(value);
        }
        catch (e) {
            throw new common_1.BadGatewayException('cache indisponível.');
        }
    }
    async setCache(key, value) {
        try {
            const syncRedisSet = (0, util_1.promisify)(redisClient.set).bind(redisClient);
            return syncRedisSet(key, value);
        }
        catch (e) {
            throw new common_1.BadGatewayException('cache indisponível.');
        }
    }
    async delCache(key) {
        try {
            const syncRedisDel = (0, util_1.promisify)(redisClient.del).bind(redisClient);
            return syncRedisDel(key);
        }
        catch (e) {
            throw new common_1.BadGatewayException('cache indisponível.');
        }
    }
}
exports.RedisConfig = RedisConfig;
//# sourceMappingURL=redis.js.map