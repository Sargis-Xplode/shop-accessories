import { ArrayMinSize, IsArray, IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";
import { Types } from "mongoose";
import SubCategories from "types/armAndEng.interface";
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
