import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { ResourcesModule } from './resources/resources.module';
import { CollectionsModule } from './collections/collections.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CategoriasModule, ResourcesModule, CollectionsModule, PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
