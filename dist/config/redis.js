"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delRedis = exports.setRedis = exports.getRedis = exports.redisClient = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const util_1 = require("util");
const redisClient = new ioredis_1.default();
exports.redisClient = redisClient;
function getRedis(value) {
    try {
        const syncRedisGet = (0, util_1.promisify)(redisClient.get).bind(redisClient);
        return syncRedisGet(value);
    }
    catch (e) {
        throw new common_1.BadGatewayException('cache indisponível.');
    }
}
exports.getRedis = getRedis;
function setRedis(key, value) {
    try {
        const syncRedisSet = (0, util_1.promisify)(redisClient.set).bind(redisClient);
        return syncRedisSet(key, value);
    }
    catch (e) {
        throw new common_1.BadGatewayException('cache indisponível.');
    }
}
exports.setRedis = setRedis;
function delRedis(key) {
    try {
        const syncRedisDel = (0, util_1.promisify)(redisClient.del).bind(redisClient);
        return syncRedisDel(key);
    }
    catch (e) {
        throw new common_1.BadGatewayException('cache indisponível.');
    }
}
exports.delRedis = delRedis;
//# sourceMappingURL=redis.js.map