import { IsNotEmpty, IsEmail } from 'class-validator';

export class OwnerDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  createdOn?: Date;
}
