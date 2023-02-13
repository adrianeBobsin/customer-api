import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CustomerEntity } from './customer.entity';
import { setRedis, getRedis } from 'src/config/redis';

@Injectable()
export class CustomerRepository {
  async save(customer: CustomerEntity) {
    await setRedis(`customer:${customer.id}`, JSON.stringify(customer));
  }

  async update(id: string, dataCustomer: CustomerEntity) {
    await this.getCustomerById(id);

    const alreadExists = await getRedis(`customer:${dataCustomer.id}`);
    if (alreadExists !== null) {
      throw new ConflictException('conflito de ID.');
    }

    await setRedis(`customer:${id}`, JSON.stringify(dataCustomer));

    return await getRedis(`customer:${id}`);
  }

  async getCustomerById(id: string) {
    const customer = await getRedis(`customer:${id}`);

    if (!customer) {
      throw new NotFoundException('cliente inexistente.');
    }

    return customer;
  }
}
