import { Exclude, Expose } from 'class-transformer';
import { PokemonTrainerDto } from './pokemon-trainer.dto';

@Exclude()
export class PokemonDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: string;

  @Expose()
  trainer: PokemonTrainerDto | null;

  @Expose()
  imageUrl?: string;
}
