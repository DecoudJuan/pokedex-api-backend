import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePokemonDto {
  @IsString() name: string;
  @IsString() type: string;
  @IsOptional()
  @IsUrl({ require_tld: false }) // admite urls locales también
  imageUrl?: string;
}
