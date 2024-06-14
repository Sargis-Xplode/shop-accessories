import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class AttachmentDTO {
    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;
}
