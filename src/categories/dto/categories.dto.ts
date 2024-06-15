import { ArrayMinSize, IsArray, MaxLength, MinLength } from "class-validator";
import { SubCategoriesDTO } from "./subcategories.dto";

export class CategoriesDTO {
    @MinLength(1)
    @MaxLength(100)
    readonly category_arm: string;

    @MinLength(1)
    @MaxLength(100)
    readonly category_eng: string;

    @IsArray()
    @ArrayMinSize(1)
    readonly subCategories: SubCategoriesDTO[];
}
