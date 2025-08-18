import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Pokemon } from '@prisma/client';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

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

  async create(data: CreatePokemonDto) {
    return this.prisma.pokemon.create({
      data: {
        name: data.name,
        type: data.type,
        imageUrl: data.imageUrl ?? null, 
      },
      select: { id: true, name: true, type: true, imageUrl: true },
    });
  }
  async findAllWithTrainer(): Promise<PokemonWithTrainer[]> {
    return this.prisma.pokemon.findMany({ include: { trainer: true } });
  }

}
