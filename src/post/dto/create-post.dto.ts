import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  description: string;

  @IsString()
  media: string;

  @IsString()
  location: string;
}
