import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ResourcesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ResourcesService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }
  create(createResourceDto: CreateResourceDto) {
    return 'This action adds a new resource';
  }

  findAll() {
    return `This action returns all resources`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }
}
