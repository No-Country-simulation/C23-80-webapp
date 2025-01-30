import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { createSlug } from "src/utils/create-slug";
import { PaginationDto } from 'src/common/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private readonly db: PrismaService) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    const { title, featuredImage } = createCategoriaDto;
    const slug = createSlug(title);
    const imageObj = {...(featuredImage && featuredImage)};
    return this.db.skillCategory.create({
      data: {
        ...createCategoriaDto,
        handle: slug,
        featuredImage: imageObj
      }
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalRercords = await this.db.skillCategory.count({where: {available: true}});
    const totalPages = Math.ceil(totalRercords / limit);

    return {
      data: await this.db.skillCategory.findMany({
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
    const category = await  this.db.skillCategory.findUnique({
      where: { handle, available: true }
    });
    if(!category) {
      throw new NotFoundException(`La categoria con la url ${handle} no existe`);
    }
    return category;
  }

  update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const {title, featuredImage, seo, resources} = updateCategoriaDto;
    const slug = createSlug(title);
    const imageObj = {...(featuredImage && featuredImage)};
    const seoObj = (seo && {
      ...seo,
      image: seo.image && {...seo.image}
    })

    return this.db.skillCategory.update({
      where: { id},
      data: {
        ...updateCategoriaDto,
        handle: slug,
        ...(featuredImage.secure_url && {featuredImage: imageObj}),
        seo: seoObj,
        ...(resources && {
          skills: {
            connect: resources.map((id) => ({ id }))
          }
        })
      }
    });
  }

  remove(id: string) {
    return this.db.skillCategory.update({
      where: { id, available: true },
      data: {
        available: false
      }
    });
  }
}
