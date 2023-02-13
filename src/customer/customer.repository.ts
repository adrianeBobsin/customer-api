import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CustomerEntity } from './customer.entity'
import { RedisConfig } from 'src/config/redis'
@Injectable()
export class CustomerRepository {
  redis = new RedisConfig()

  async save(customer: CustomerEntity) {
    await this.redis.setCache(`customer:${customer.id}`, JSON.stringify(customer))
  }

  async update(id: string, dataCustomer: CustomerEntity) {
    await this.getCustomerById(id)

    const alreadExists = await this.redis.getCache(`customer:${dataCustomer.id}`)
    if (alreadExists !== null) {
      throw new ConflictException('conflito de ID.')
    }

    await this.redis.setCache(`customer:${id}`, JSON.stringify(dataCustomer))

    return await this.redis.getCache(`customer:${id}`)
  }

  async getCustomerById(id: string) {
    const customer = await this.redis.getCache(`customer:${id}`)

    if (!customer) {
      throw new NotFoundException('cliente inexistente.')
    }

    return customer
  }
}
