import { IsOptional, IsString } from "class-validator";

export class CreateResourceDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    url: string;
}
