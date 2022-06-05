import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
