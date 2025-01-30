import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UserReviewDto {
    @IsString()
    userId: string;

    @IsInt({ message: 'El rating debe ser un número entero' })
    @Min(1, { message: 'El rating no puede ser menor a 1' })
    @Max(5, { message: 'El rating no puede ser mayor a 5' })
    rating: number;

    @IsOptional()
    @IsString()
    comment?: string;
}