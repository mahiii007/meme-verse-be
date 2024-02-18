import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBase64, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  firstname?: string;

  @IsOptional()
  lastname?: string;
  @IsOptional()
  address?: string;
  @IsOptional()
  bio?: string;

  @IsDate()
  @IsOptional()
  dob?: Date;

  @IsString()
  @IsOptional()
  profile_pic?: string;
}
