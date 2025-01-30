import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionDto } from './create-collection.dto';
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SeoDto } from 'src/common/dto';

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {
    @IsOptional()
    @ValidateNested()
    @Type(() => SeoDto)
    seo?: SeoDto;

    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    resources?: string[];
}
