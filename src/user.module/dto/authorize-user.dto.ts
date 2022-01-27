import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthorizeUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
