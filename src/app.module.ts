import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { HealthController } from './healthz/healthz.controller';
import { AbilitiesModule } from './abilities/abilities.module';
import { TrainersModule } from './trainer/trainer.module';


@Module({
  imports: [PokemonModule, AbilitiesModule, TrainersModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
