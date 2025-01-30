import { IsOptional, IsPositive, IsString, IsUrl } from "class-validator";

export class ImageDto {
    @IsUrl()
    secure_url: string;
    
    @IsString()
    public_id: string;

    @IsString()
    @IsOptional()
    altText?: string;

    @IsPositive()
    width: number;

    @IsPositive()
    height: number;
}