import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PaginationDto } from 'src/common/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createSlug } from 'src/utils/create-slug';

@Injectable()
export class CollectionsService {
  constructor(private readonly db: PrismaService) {}

  create(createCollectionDto: CreateCollectionDto) {
    const { title, featuredImage } = createCollectionDto;
    const slug = createSlug(title);
    const imageObj = {...(featuredImage && featuredImage)}
    return this.db.skillCollection.create({
      data: {
        ...createCollectionDto,
        handle: slug,
        featuredImage: imageObj
      }
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalRercords = await this.db.skillCollection.count({where: {available: true}});
    const totalPages = Math.ceil(totalRercords / limit);
    return {
      data: await this.db.skillCollection.findMany({
        take: limit,
        skip: (page - 1) * limit
      }),
      meta: {
        page,
        totalRercords,
        totalPages
      }
    }
  }

  async findOne(handle: string) {
    const collection = await this.db.skillCollection.findUnique({
      where: { handle, available: true }
    });
    if(!collection) {
      throw new NotFoundException(`La colección con la url ${handle} no existe`);
    }
    return collection;
  }

  update(id: string, updateCollectionDto: UpdateCollectionDto) {
    const { title, featuredImage, seo, resources } = updateCollectionDto;
    const slug = createSlug(title);
    const imageObj = {...(featuredImage && featuredImage)}
    const seoObj = {...(seo && {
      ...seo,
      image: seo.image && {...seo.image}
    })}
    return this.db.skillCollection.update({
      where: { id },
      data: {
        ...updateCollectionDto,
        handle: slug,
        featuredImage: imageObj,
        seo: seoObj,
        ...(resources && {
          skills: {
            connect: resources.map((id) => ({ id }))
          }
        })
      }
    })
  }

  remove(id: string) {
    return this.db.skillCollection.update({
      where: { id, available: true },
      data: {
        available: false
      }
    })
  }
}
