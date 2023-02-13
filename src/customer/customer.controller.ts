import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDTO } from './dto/createCustomer.dto';
import { CustomerEntity } from './customer.entity';
import { v4 as uuid } from 'uuid';
import { ListCustomerDTO } from './dto/listCustomer.dto';
import { UpdateCustomerDTO } from './dto/updateCustomer.dto';
import { getRedis } from 'src/config/redis';

@Controller('/customers')
export class CustomerController {
  constructor(private customerRepository: CustomerRepository) {}

  @Post()
  async createCustomer(
    @Body() customerData: CreateCustomerDTO,
    @Headers() headers: Record<string, string>,
  ): Promise<{ customer: ListCustomerDTO; message: string }> {
    const customerEntity = new CustomerEntity();
    customerEntity.name = customerData.name;
    customerEntity.id = uuid();

    await this.tokenValidation(headers.authorization);

    this.customerRepository.save(customerEntity);
    return {
      customer: new ListCustomerDTO(customerEntity.id, customerEntity.name),
      message: 'cliente criado com sucesso.',
    };
  }

  @Get('/:id')
  async getCustomerById(
    @Param('id') id: string,
    @Headers() headers: Record<string, string>,
  ) {
    await this.tokenValidation(headers.authorization);
    const customer = await this.customerRepository.getCustomerById(id);
    return customer;
  }

  @Put('/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() dataCustomer: UpdateCustomerDTO,
    @Headers() headers: Record<string, string>,
  ) {
    await this.tokenValidation(headers.authorization);

    const updatedCustomer = await this.customerRepository.update(
      id,
      dataCustomer,
    );
    return {
      customer: updatedCustomer,
      message: 'cliente atualizada com sucesso.',
    };
  }

  protected async tokenValidation(token: string) {
    const tokenRedis = await getRedis('token');
    const tokenRequest = token?.split(' ')[1];
    if (
      tokenRedis == null ||
      tokenRequest == null ||
      tokenRequest.localeCompare(tokenRedis) !== 0
    ) {
      throw new UnauthorizedException();
    }
  }
}
