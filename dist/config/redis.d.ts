export declare class RedisConfig {
    getCache(value: string): Promise<any>;
    setCache(key: string, value: string): Promise<any>;
    delCache(key: string): Promise<any>;
}
