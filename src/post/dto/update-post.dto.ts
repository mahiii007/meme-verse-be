import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  location: string;
}
