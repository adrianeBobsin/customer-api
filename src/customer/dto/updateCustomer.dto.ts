import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateCustomerDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  document: number;

  @IsNotEmpty()
  name: string;
}
