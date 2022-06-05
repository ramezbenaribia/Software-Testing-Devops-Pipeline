import { IsNotEmpty } from 'class-validator';

export class LoginOwnerDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
