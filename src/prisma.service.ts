import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      // No tiramos la app si la DB no está lista en boot; así /healthz responde 200
      await this.$connect();
      this.logger.log('Prisma connected');
    } catch (e) {
      this.logger.error('Prisma connect failed at boot; continuing', e as any);
      // no throw -> la app levanta igual
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
