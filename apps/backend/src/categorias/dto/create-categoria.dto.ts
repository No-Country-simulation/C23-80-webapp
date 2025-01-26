import { IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto {

    @IsString()
    public title: string;
    
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    featuredImage: string;
}
