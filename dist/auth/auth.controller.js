"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const redis_1 = require("../config/redis");
let AuthController = class AuthController {
    constructor() {
        this.redis = new redis_1.RedisConfig();
    }
    async generateToken() {
        const data = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'customers',
            client_secret: '453000f7-47a0-4489-bc47-891c742650e2',
            username: 'adrianebobsin@gmail.com',
            password: 'YWRyaWFuZWJvYnNpbkBnbWFpbC5jb20',
            scope: 'openid'
        });
        let token;
        try {
            token = await axios_1.default.post('https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token', data, {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            });
        }
        catch (e) {
            throw new common_1.BadGatewayException('sso indisponível.');
        }
        await this.redis.setCache('token', token.data.access_token);
        return JSON.stringify(token.data);
    }
};
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateToken", null);
AuthController = __decorate([
    (0, common_1.Controller)('/auth')
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map