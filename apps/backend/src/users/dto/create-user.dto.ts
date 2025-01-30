import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    @MinLength(8, {message: 'La contraseña debe tener al menos 8 caracteres'})
    password: string;
}