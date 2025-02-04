import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto';
import { createSlug } from 'src/utils/create-slug';
import { UserReviewDto } from './dto/user-review.dto';

@Injectable()
export class ResourcesService {
  constructor(private readonly db: PrismaService) {}

  create(createResourceDto: CreateResourceDto) {
    const { title, featuredImage, categories } = createResourceDto;
    const slug = createSlug(title);
    const imageObj = {...(featuredImage && featuredImage)};
    return this.db.skill.create({
      data: {
        ...createResourceDto,
        handle: slug,
        featuredImage: imageObj,
        categories: {
          connect: categories.map((id) => ({id}))
        }
      }
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalRercords = await this.db.skill.count({where: {available: true}});
    const totalPages = Math.ceil(totalRercords / limit);
    return {
      data: await this.db.skill.findMany({
        take: limit,
        skip: (page - 1) * limit
      }),
      meta: {
        page,
        totalRercords,
        totalPages
      }
    };
  };

  async findAllByUser(userId: string, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalRecords = await this.db.skill.count({where: {userId, available: true}});
    const totalPages = Math.ceil(totalRecords / limit);
    return {
      data: await this.db.skill.findMany({
        where: {userId},
        include: {
          categories: {select: {id: true, title: true}}
        },
        take: limit,
        skip: (page - 1) * limit
      }),
      meta: {
        page,
        totalRecords,
        totalPages
      }
    }
  }

  async findOne(handle: string) {
    const resource = await this.db.skill.findUnique({where: {handle, available: true}});
    
    if (!resource) {
      throw new NotFoundException(`El recurso con la url ${handle} no existe`);
    }
    await this.db.skill.update({
      where: {handle},
      data: {
        visibilityCount: {increment: 1}
      }
    })
    return resource;
  }

  update(id: string, updateResourceDto: UpdateResourceDto) {
    const { title, featuredImage, seo, categories } = updateResourceDto;
    const slug = createSlug(title);
    const imageObj = {...(featuredImage && featuredImage)};
    const seoObj = (seo && {
      ...seo,
      image: seo.image && {...seo.image}
    });

    return this.db.skill.update({
      where: { id },
      data: {
        ...updateResourceDto,
        handle: slug,
        ...(featuredImage.secure_url && {featuredImage: imageObj}),
        seo: seoObj,
        ...(categories && {
          categories: {
            deleteMany: {},
            connect: categories.map((id) => ({ id }))
          }
        })
      }
    })
  }

  createReview(id: string, reveiwDto: UserReviewDto) {
    return this.db.skill.update({
      where: {id},
      data: {
        reviews: {
          upsert: {
            where: { unique_review: {skillId:id, userId:reveiwDto.userId} },
            update: reveiwDto,
            create: reveiwDto
          }
        }
      }
    })
  }

  remove(id: string) {
    return this.db.skill.update({
      where: {id, available: true}, 
      data: {
        available: false
      }
    });
  }
}
