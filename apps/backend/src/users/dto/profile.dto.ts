import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { ImageDto } from "src/common/dto";

export class ProfileDto {
    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    professions?: string[];

    @IsOptional()
    userId: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ImageDto)
    image?: ImageDto;
}