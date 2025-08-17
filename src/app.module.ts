import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { HealthController } from './healthz/healthz.controller';


@Module({
  imports: [PokemonModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
