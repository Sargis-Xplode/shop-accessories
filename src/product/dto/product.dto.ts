import { IsArray, IsNotEmpty } from "class-validator";
import ColorsAndImages from "types/colorsAndImages.interface";
import ExtraInfo from "../../../types/extraInfo.interface";
import { FilterCategory } from "../product.model";

export class ProductDTO {
    @IsNotEmpty()
    readonly name_arm: string;

    @IsNotEmpty()
    readonly name_eng: string;

    @IsNotEmpty()
    readonly description_arm: string;

    @IsNotEmpty()
    readonly description_eng: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly sale: number;

    @IsNotEmpty()
    readonly available: number;

    @IsNotEmpty()
    readonly collection_id: string;

    @IsNotEmpty()
    readonly extra_info: ExtraInfo;

    @IsNotEmpty()
    readonly filter_categories: FilterCategory;

    @IsArray()
    readonly filter_materials: string[];

    @IsArray()
    readonly filter_styles: string[];

    @IsArray()
    readonly filter_occasions: string[];

    @IsArray()
    readonly colors_and_images: ColorsAndImages[];
}
