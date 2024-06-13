import { IsNotEmpty } from "class-validator";

export class FilterStyleDTO {
    @IsNotEmpty()
    readonly name_arm: string;

    @IsNotEmpty()
    readonly name_eng: string;
}
