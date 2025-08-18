import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = [
    'http://localhost:5173',              // frontend en dev
    'https://pokedex-api-app.vercel.app'  // frontend en prod
  ];
  
  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // permite curl / Postman
      if (whitelist.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS bloqueado para ${origin}`), false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  

}
bootstrap();
