import { IsNotEmpty, MinLength, IsEmail, IsPhoneNumber } from "class-validator";

export class ContactDTO {
    @IsNotEmpty()
    readonly first_name: string;

    @IsNotEmpty()
    readonly last_name: string;

    @IsEmail()
    readonly email: string;

    @IsPhoneNumber()
    readonly phone_number: string;

    @IsNotEmpty()
    @MinLength(3)
    readonly subject: string;

    @IsNotEmpty()
    @MinLength(10)
    readonly message: string;
}
