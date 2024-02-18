import {
  IS_STRONG_PASSWORD,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Length,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  username: string;
}
