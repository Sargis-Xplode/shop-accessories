import { IsNotEmpty } from "class-validator";

export class TermsDTO {
    @IsNotEmpty()
    readonly description_arm: string;

    @IsNotEmpty()
    readonly description_eng: string;
}
