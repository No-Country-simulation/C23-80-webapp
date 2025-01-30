import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";
import { ImageDto } from "src/common/dto";

export class CreateResourceDto {
    @IsString()
    userId: string;

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ImageDto)
    featuredImage?: ImageDto;

    @IsUrl()
    url: string;

    @IsArray()
    @IsString({ each: true })
    categories: string[];
}