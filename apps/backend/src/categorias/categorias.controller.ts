import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PaginationDto } from 'src/common/dto';
import { Public } from 'src/auth/auth.guard';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Public()
  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.categoriasService.findAll(paginationDto);
  }

  @Public()
  @Get(':handle')
  findOne(@Param('handle') handle: string) {
    return this.categoriasService.findOne(handle);
  }

  @Public()
  @Get('by-id/:id')
  findOneById(@Param('id') id: string) {
    return this.categoriasService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(id);
  }

  @Delete('soft-delete/:id')
  softDelete(@Param('id') id: string) {
    return this.categoriasService.softDelete(id);
  }
}
