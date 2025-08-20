import { Module } from '@nestjs/common';
import { TrainersController } from './trainer.controller';
import { TrainersService } from './trainer.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TrainersController],
  providers: [TrainersService, PrismaService],
})
export class TrainersModule {}
