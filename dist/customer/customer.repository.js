"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("../config/redis");
let CustomerRepository = class CustomerRepository {
    constructor() {
        this.redis = new redis_1.RedisConfig();
    }
    async save(customer) {
        await this.redis.setCache(`customer:${customer.id}`, JSON.stringify(customer));
    }
    async update(id, dataCustomer) {
        await this.getCustomerById(id);
        const alreadExists = await this.redis.getCache(`customer:${dataCustomer.id}`);
        if (alreadExists !== null) {
            throw new common_1.ConflictException('conflito de ID.');
        }
        await this.redis.setCache(`customer:${id}`, JSON.stringify(dataCustomer));
        return await this.redis.getCache(`customer:${id}`);
    }
    async getCustomerById(id) {
        const customer = await this.redis.getCache(`customer:${id}`);
        if (!customer) {
            throw new common_1.NotFoundException('cliente inexistente.');
        }
        return customer;
    }
};
CustomerRepository = __decorate([
    (0, common_1.Injectable)()
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map