import { CustomerEntity } from './customer.entity';
export declare class CustomerRepository {
    save(customer: CustomerEntity): Promise<void>;
    update(id: string, dataCustomer: Partial<CustomerEntity>): Promise<any>;
    getCustomerById(id: string): Promise<any>;
}
