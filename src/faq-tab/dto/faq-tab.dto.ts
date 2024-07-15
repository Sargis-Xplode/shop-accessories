import { IsNotEmpty } from "class-validator";

export class FAQTabDTO {
    @IsNotEmpty()
    readonly name_arm: string;

    @IsNotEmpty()
    readonly name_eng: string;
}
