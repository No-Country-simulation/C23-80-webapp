import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SeoDto } from 'src/common/dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => SeoDto)
    seo?: SeoDto;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    resources?: string[];
}
