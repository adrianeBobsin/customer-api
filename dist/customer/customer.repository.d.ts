import { CustomerEntity } from './customer.entity';
import { RedisConfig } from 'src/config/redis';
export declare class CustomerRepository {
    redis: RedisConfig;
    save(customer: CustomerEntity): Promise<void>;
    update(id: string, dataCustomer: CustomerEntity): Promise<any>;
    getCustomerById(id: string): Promise<any>;
}
