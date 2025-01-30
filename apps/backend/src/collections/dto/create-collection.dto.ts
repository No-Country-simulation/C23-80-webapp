import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { ImageDto } from "src/common/dto";

export class CreateCollectionDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ImageDto)
    featuredImage?: ImageDto;
}
