import { ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import SubCategories from "types/subcategories.interface";
import { SubCategoriesDTO } from "./subcategories.dto";

export class CategoriesDTO {
    @IsNotEmpty()
    readonly category_arm: string;

    @IsNotEmpty()
    readonly category_eng: string;

    @IsArray()
    @ArrayMinSize(1)
    readonly subCategories: SubCategoriesDTO[];
}
