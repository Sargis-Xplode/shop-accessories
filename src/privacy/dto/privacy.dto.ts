import { IsNotEmpty } from "class-validator";

export class PrivacyDTO {
    @IsNotEmpty()
    readonly description_arm: string;

    @IsNotEmpty()
    readonly description_eng: string;
}
