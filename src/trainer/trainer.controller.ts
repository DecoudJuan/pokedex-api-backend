import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { TrainersService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly svc: TrainersService) {}

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 12,
    @Query('search') search?: string,
  ) {
    return this.svc.findAll({ page: +page, limit: +limit, search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTrainerDto) {
    return this.svc.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrainerDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
