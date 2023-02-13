import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';

@Module({
  controllers: [CustomerController],
  providers: [CustomerRepository],
})
export class CustomerModule {}
