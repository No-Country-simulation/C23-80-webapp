import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionDto } from './create-collection.dto';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
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
}
