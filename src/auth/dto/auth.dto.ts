import { IsNotEmpty, IsEmail, IsString } from "class-validator";
import { validatePassword } from "src/user/validation";

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @validatePassword()
    password: string;
}