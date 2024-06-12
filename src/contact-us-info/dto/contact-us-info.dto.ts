import { IsNotEmpty } from "class-validator";

export class ContactUsInfoDTO {
    @IsNotEmpty()
    readonly description_arm: string;

    @IsNotEmpty()
    readonly description_eng: string;
}
