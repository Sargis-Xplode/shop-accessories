import { IsArray, IsBoolean, IsOptional, MaxLength, MinLength } from "class-validator";
import { SubCategoriesDTO } from "./subcategories.dto";

export class CategoriesDTO {
    @MinLength(1)
    @MaxLength(100)
    readonly category_arm: string;

    @MinLength(1)
    @MaxLength(100)
    readonly category_eng: string;

    @IsBoolean()
    readonly has_sizes: boolean;

    @IsArray()
    @IsOptional()
    readonly subCategories: SubCategoriesDTO[];
}
