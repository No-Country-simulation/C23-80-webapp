import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { ImageDto } from "src/common/dto/image.dto";

export class SeoDto {
    @IsString()
    title: string;
    
    @IsString()
    description: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ImageDto)
    image?: ImageDto;
}