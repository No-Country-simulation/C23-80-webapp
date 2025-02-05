import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PaginationDto } from 'src/common/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createSlug } from 'src/utils/create-slug';

@Injectable()
export class CollectionsService {
  constructor(private readonly db: PrismaService) { }

  create(createCollectionDto: CreateCollectionDto) {
    const { title, featuredImage, skills } = createCollectionDto;
    const slug = createSlug(title);
    const imageObj = { ...(featuredImage && featuredImage) }
    
    return this.db.skillCollection.create({
      data: {
        ...createCollectionDto,
        handle: slug,
        ...(featuredImage?.secure_url && { featuredImage: imageObj }),
        skills: {
          connect: skills.map((id) => ({ id }))
        }
      }
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalRercords = await this.db.skillCollection.count({ where: { available: true } });
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
    if (!collection) {
      throw new NotFoundException(`La colección con la url ${handle} no existe`);
    }
    return collection;
  }

  async findOneById(id: string) {
    const collection = await this.db.skillCollection.findUnique({
      where: { id, available: true },
      include: {
        skills: {
          select: { id: true, title: true }
        }
      }
    });
    if (!collection) {
      throw new NotFoundException(`La colección con el id ${id} no existe`);
    }
    return collection;
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto) {
    const { title, featuredImage, seo, skills } = updateCollectionDto;
    const slug = createSlug(title);
    const imageObj = { ...(featuredImage && featuredImage) }
    const seoObj = {
      ...(seo && {
        ...seo,
        image: seo.image && { ...seo.image }
      })
    }

    const desConnectResources = await this.db.skillCollection.findUnique({ where: { id } }).skills({
      where: { id: { notIn: skills } },
      select: { id: true }
    });

    return this.db.skillCollection.update({
      where: { id },
      data: {
        ...updateCollectionDto,
        handle: slug,
        ...(featuredImage?.secure_url && { featuredImage: imageObj }),
        seo: seoObj,
        ...(skills?.length && {
          skills: {
            disconnect: desConnectResources.map((id) => ({ id: id.id })),
            connect: skills.map((id) => ({ id }))
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

  softDelete(id: string) {
    return this.db.skillCollection.delete({ where: { id } });
  }
}
