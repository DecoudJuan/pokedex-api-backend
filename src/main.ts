import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // IMPORTANTE: permite healthcheck y curl
      const whitelist = ['http://localhost:5173', 'https://pokedex-api-app.vercel.app'];
      return whitelist.includes(origin) ? cb(null, true) : cb(new Error('CORS'), false);
    },
    credentials: true,
  });
  

}
bootstrap();
