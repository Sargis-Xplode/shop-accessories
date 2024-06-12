import { IsNotEmpty, Matches } from "class-validator";

export class AuthUpdatePasswordDTO {
    @IsNotEmpty()
    @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$/, {
        message: "password must minimum 8 characters long and contain numbers and letters",
    })
    readonly password: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$/, {
        message: "password must minimum 8 characters long and contain numbers and letters",
    })
    readonly new_password: string;
}
