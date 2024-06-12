import { IsNotEmpty } from "class-validator";

export class AboutDTO {
    @IsNotEmpty()
    readonly description_arm: string;

    @IsNotEmpty()
    readonly description_eng: string;

    @IsNotEmpty()
    readonly image: string;
}
