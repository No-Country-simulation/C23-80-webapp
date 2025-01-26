import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaClient } from '@prisma/client';
import { createSlug } from "src/utils/create-slug";
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class CategoriasService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('CategoriasService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createCategoriaDto: CreateCategoriaDto) {
    const slug = createSlug(createCategoriaDto.title);
    return this.skillCategory.create({
      data: {
        ...createCategoriaDto,
        handle: slug
      }
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalRercords = await this.skillCategory.count({where: {available: true}});
    const totalPages = Math.ceil(totalRercords / limit);

    return {
      data: await this.skillCategory.findMany({
        take: limit,
        skip: (page - 1) * limit
      }),
      meta: {
        page,
        totalRercords,
        totalPages,
      }
    };
  }

  async findOne(handle: string) {
    const category = await  this.skillCategory.findUnique({
      where: { handle, available: true }
    });
    if(!category) {
      throw new NotFoundException(`Category with handle ${handle} not found`);
    }
    return category;
  }

  update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const slug = createSlug(updateCategoriaDto.title);

    return this.skillCategory.update({
      where: { id},
      data: {
        ...updateCategoriaDto,
        handle: slug
      }
    });
  }

  remove(id: string) {
    return this.skillCategory.update({
      where: { id, available: true },
      data: {
        available: false
      }
    });
  }
}
