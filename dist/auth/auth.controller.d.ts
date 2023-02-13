import { RedisConfig } from 'src/config/redis';
export declare class AuthController {
    redis: RedisConfig;
    generateToken(): Promise<string>;
}
