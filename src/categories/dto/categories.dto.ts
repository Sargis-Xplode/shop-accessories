import { ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";
import SubCategories from "types/subcategories";

export class CategoriesDTO {
    @IsNotEmpty()
    readonly category_arm: string;

    @IsNotEmpty()
    readonly category_eng: string;

    @IsArray()
    @ArrayMinSize(1)
    readonly subCategories: SubCategories[];
}
