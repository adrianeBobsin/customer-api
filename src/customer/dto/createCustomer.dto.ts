import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDTO {
  @IsNotEmpty()
  document: number;

  @IsNotEmpty()
  name: string;
}
