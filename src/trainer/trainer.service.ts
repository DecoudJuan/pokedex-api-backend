import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

type ListParams = { page?: number; limit?: number; search?: string };

@Injectable()
export class TrainersService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page = 1, limit = 12, search }: ListParams) {
    const where: Prisma.PokemonTrainerWhereInput = search
      ? { name: { contains: search, mode: 'insensitive' } }
      : {};

    return this.prisma.pokemonTrainer.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: 'asc' },

    });
  }

  async findOne(id: string) {
    const t = await this.prisma.pokemonTrainer.findUnique({ where: { id } });
    if (!t) throw new NotFoundException('Entrenador no encontrado');
    return t;
  }

  create(data: { name: string; email: string; imageUrl?: string }) {
    return this.prisma.pokemonTrainer.create({ data });
  }

  async update(id: string, data: { name?: string; email?: string; imageUrl?: string }) {
    try {
      return await this.prisma.pokemonTrainer.update({ where: { id }, data });
    } catch {
      throw new NotFoundException('Entrenador no encontrado');
    }
  }

  async remove(id: string) {
    await this.prisma.pokemonTrainer.delete({ where: { id } }).catch(() => {
      throw new NotFoundException('Entrenador no encontrado');
    });
  }
}
