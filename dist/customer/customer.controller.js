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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const customer_repository_1 = require("./customer.repository");
const createCustomer_dto_1 = require("./dto/createCustomer.dto");
const customer_entity_1 = require("./customer.entity");
const uuid_1 = require("uuid");
const listCustomer_dto_1 = require("./dto/listCustomer.dto");
const updateCustomer_dto_1 = require("./dto/updateCustomer.dto");
const redis_1 = require("../config/redis");
let CustomerController = class CustomerController {
    constructor(customerRepository, redis) {
        this.customerRepository = customerRepository;
        this.redis = redis;
    }
    async createCustomer(customerData, headers) {
        const customerEntity = new customer_entity_1.CustomerEntity();
        customerEntity.name = customerData.name;
        customerEntity.id = (0, uuid_1.v4)();
        await this.tokenValidation(headers.authorization);
        this.customerRepository.save(customerEntity);
        return {
            customer: new listCustomer_dto_1.ListCustomerDTO(customerEntity.id, customerEntity.name),
            message: 'cliente criado com sucesso.'
        };
    }
    async getCustomerById(id, headers) {
        await this.tokenValidation(headers.authorization);
        const customer = await this.customerRepository.getCustomerById(id);
        return customer;
    }
    async updateCustomer(id, dataCustomer, headers) {
        await this.tokenValidation(headers.authorization);
        const updatedCustomer = await this.customerRepository.update(id, dataCustomer);
        return {
            customer: updatedCustomer,
            message: 'cliente atualizada com sucesso.'
        };
    }
    async tokenValidation(token) {
        const tokenRedis = await this.redis.getCache('token');
        const tokenRequest = token === null || token === void 0 ? void 0 : token.split(' ')[1];
        if (tokenRedis == null ||
            tokenRequest == null ||
            tokenRequest.localeCompare(tokenRedis) !== 0) {
            throw new common_1.UnauthorizedException();
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCustomer_dto_1.CreateCustomerDTO, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateCustomer_dto_1.UpdateCustomerDTO, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomer", null);
CustomerController = __decorate([
    (0, common_1.Controller)('/customers'),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository, redis_1.RedisConfig])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map