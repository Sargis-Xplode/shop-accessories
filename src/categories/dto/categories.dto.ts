import { ArrayMinSize, IsArray, IsOptional, MaxLength, MinLength } from "class-validator";
import { SubCategoriesDTO } from "./subcategories.dto";
import { Transform } from "class-transformer";

export class CategoriesDTO {
    @MinLength(1)
    @MaxLength(100)
    readonly category_arm: string;

    @MinLength(1)
    @MaxLength(100)
    readonly category_eng: string;

    @IsArray()
    @IsOptional()
    readonly subCategories: SubCategoriesDTO[];
}
