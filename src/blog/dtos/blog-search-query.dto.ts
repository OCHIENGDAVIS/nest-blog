import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class BlogSearchQuery {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;
}
