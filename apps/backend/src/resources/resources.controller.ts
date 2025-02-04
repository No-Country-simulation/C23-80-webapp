import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { PaginationDto } from 'src/common/dto';
import { UserReviewDto } from './dto/user-review.dto';
import { Public } from 'src/auth/auth.guard';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Public()
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.resourcesService.findAll(paginationDto);
  }

  @Public()
  @Get('by-user/:userId')
  findAllByUser(@Param('userId') userId: string, @Query() paginationDto: PaginationDto) {
    return this.resourcesService.findAllByUser(userId, paginationDto);
  }

  @Public()
  @Get(':handle')
  findOne(@Param('handle') handle: string) {
    return this.resourcesService.findOne(handle);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Post(':id/reviews')
  createReview(@Param('id') id: string, @Body() userReviewDto: UserReviewDto) {
    return this.resourcesService.createReview(id, userReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}
