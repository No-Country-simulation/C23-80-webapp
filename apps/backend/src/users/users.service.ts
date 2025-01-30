import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/pw-hasher';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class UsersService {
  constructor (private readonly db: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await hashPassword(password);
    return this.db.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        profile: {
          create: {}
        }
      }
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalRercords = await this.db.user.count({where: {status: true}});
    const totalPages = Math.ceil(totalRercords / limit);
    return {
      data: await this.db.user.findMany({
        include: { profile: true },
        take: limit,
        skip: (page - 1) * limit
      }),
      meta: {
        page,
        totalRercords,
        totalPages,
      }
    }
  }

  findOne(email: string) {
    const user = this.db.user.findUnique({where: {email, status: true}, include: {profile: true}});
    if(!user) {
      throw new NotFoundException(`El usuario con el id ${email} no existe`);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    delete updateUserDto.password;
    const { profile } = updateUserDto;
    const imageObj = {...(profile?.image && profile.image)};
    return this.db.user.update({
      where: { id, status: true },
      data: {
        ...updateUserDto,
        profile: {
          upsert: {
            where: { userId: id },
            create: {
              ...profile,
              ...(imageObj.secure_url && { image: imageObj })
            },
            update: {
              ...profile,
              ...(imageObj.secure_url && { image: imageObj })
            }
          }
        },
      },
      include: { profile: true }
    })
  }

  remove(id: string) {
    return this.db.user.update({
      where: { id, status: true },
      data: { status: false }
    })
  }
}
