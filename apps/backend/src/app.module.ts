import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { ResourcesModule } from './resources/resources.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
  imports: [CategoriasModule, ResourcesModule, CollectionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
