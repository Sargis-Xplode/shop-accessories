import { IsNotEmpty } from "class-validator";

export class FilterOccasionDTO {
    @IsNotEmpty()
    readonly name_arm: string;

    @IsNotEmpty()
    readonly name_eng: string;
}
