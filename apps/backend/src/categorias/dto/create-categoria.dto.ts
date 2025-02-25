import { IsOptional, IsString, ValidateNested } from "class-validator";
import { ImageDto } from "src/common/dto/image.dto";
import { Type } from "class-transformer";

export class CreateCategoriaDto {
    @IsString()
    public title: string;
    
    @IsString()
    description: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ImageDto)
    featuredImage?: ImageDto;
}
