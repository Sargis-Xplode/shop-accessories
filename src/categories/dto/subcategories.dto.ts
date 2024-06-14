import { IsNotEmpty } from "class-validator";

export class SubCategoriesDTO {
    @IsNotEmpty()
    readonly subcategory_arm: string;

    @IsNotEmpty()
    readonly subcategory_eng: string;
}
