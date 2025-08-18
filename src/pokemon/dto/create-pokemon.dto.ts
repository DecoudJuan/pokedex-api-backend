import { IsOptional, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsString() name: string;
  @IsString() type: string;
  @IsOptional() @IsString() imageUrl?: string; 
}
