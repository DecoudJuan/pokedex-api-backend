import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl({ require_protocol: false }, { message: 'imageUrl inválida' })
  imageUrl?: string;
}
