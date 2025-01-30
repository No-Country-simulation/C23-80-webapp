import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './create-resource.dto';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SeoDto } from 'src/common/dto';

export class UpdateResourceDto extends PartialType(CreateResourceDto) {
    @IsOptional()
    @ValidateNested()
    @Type(() => SeoDto)
    seo?: SeoDto;

    @IsOptional()
    @IsBoolean()
    available: boolean;
}