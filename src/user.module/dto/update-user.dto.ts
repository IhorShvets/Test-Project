import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  readonly username: string;

  @IsEmail()
  readonly email: string;

  readonly password: string;

  readonly repeatPassword: string;

  readonly image: string;

  readonly bio: string;
}
