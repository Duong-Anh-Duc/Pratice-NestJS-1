import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username : string

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email : string

    @IsNotEmpty()
    @IsStrongPassword({})
    @IsString()
    password : string
}
