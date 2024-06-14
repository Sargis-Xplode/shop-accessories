import { MaxLength, MinLength } from "class-validator";

export class SubCategoriesDTO {
    @MinLength(1)
    @MaxLength(100)
    readonly subcategory_arm: string;

    @MinLength(1)
    @MaxLength(100)
    readonly subcategory_eng: string;
}
