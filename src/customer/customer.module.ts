import { Module } from '@nestjs/common'
import { RedisConfig } from 'src/config/redis'
import { CustomerController } from './customer.controller'
import { CustomerRepository } from './customer.repository'

@Module({
  controllers: [CustomerController],
  providers: [CustomerRepository, RedisConfig]
})
export class CustomerModule {}
