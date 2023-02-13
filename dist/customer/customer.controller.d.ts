import { CustomerRepository } from './customer.repository';
import { CreateCustomerDTO } from './dto/createCustomer.dto';
import { ListCustomerDTO } from './dto/listCustomer.dto';
import { UpdateCustomerDTO } from './dto/updateCustomer.dto';
import { RedisConfig } from 'src/config/redis';
export declare class CustomerController {
    private customerRepository;
    private redis;
    constructor(customerRepository: CustomerRepository, redis: RedisConfig);
    createCustomer(customerData: CreateCustomerDTO, headers: Record<string, string>): Promise<{
        customer: ListCustomerDTO;
        message: string;
    }>;
    getCustomerById(id: string, headers: Record<string, string>): Promise<any>;
    updateCustomer(id: string, dataCustomer: UpdateCustomerDTO, headers: Record<string, string>): Promise<{
        customer: any;
        message: string;
    }>;
    protected tokenValidation(token: string): Promise<void>;
}
