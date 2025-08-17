import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PokemonTrainerDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
