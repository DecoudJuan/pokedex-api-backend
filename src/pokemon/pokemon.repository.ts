import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Pokemon } from '@prisma/client';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

type PokemonWithTrainer = Prisma.PokemonGetPayload<{ include: { trainer: true } }>;

@Injectable()
export class PokemonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Pokemon[]> {
    return this.prisma.pokemon.findMany();
  }

  async findById(id: string): Promise<Pokemon | null> {
    return this.prisma.pokemon.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<Pokemon | null> {
    return this.prisma.pokemon.findFirst({ where: { name } });
  }

  async create(data: CreatePokemonDto): Promise<Pokemon> {
    return this.prisma.pokemon.create({
      data: { name: data.name, type: data.type },
    });
  }

  async findAllWithTrainer(): Promise<PokemonWithTrainer[]> {
    return this.prisma.pokemon.findMany({ include: { trainer: true } });
  }

  async update(id: string, data: UpdatePokemonDto): Promise<Pokemon> {
    return this.prisma.pokemon.update({
      where: { id },
      data: { name: data.name, type: data.type, trainerId: data.trainerId },
    });
  }
}
