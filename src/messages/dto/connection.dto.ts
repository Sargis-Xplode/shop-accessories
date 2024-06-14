import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class ConnectionCreateDTO {
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(2)
    readonly name: string;

    @IsNotEmpty()
    @MinLength(5)
    readonly subject: string;

    @IsNotEmpty()
    readonly timeZone: string;
}
