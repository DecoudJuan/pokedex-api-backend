import { Expose } from 'class-transformer';

export class AbilityDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  power: number;
}
