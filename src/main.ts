import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = [
    'http://localhost:5173',
    'https://pokedex-api-app.vercel.app',
  ];

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      return whitelist.includes(origin)
        ? cb(null, true)
        : cb(new Error('CORS: origin not allowed'), false);
    },
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
  });

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`API listening on ${await app.getUrl()}`);
}
bootstrap();
