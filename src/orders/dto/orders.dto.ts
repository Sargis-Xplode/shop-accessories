import { IsNotEmpty, IsOptional } from "class-validator";
import { ProductModel } from "src/product/product.model";
import { CartItemDTO } from "types/cardItem.interface";

export class OrderDTO {
    @IsOptional()
    readonly title: string;

    @IsNotEmpty()
    readonly products: CartItemDTO[];

    // @IsNotEmpty()
    // readonly names: string[];

    // @IsNotEmpty()
    // readonly status: number;

    // @IsNotEmpty()
    // readonly product_ids: string[];

    // @IsNotEmpty()
    // readonly prices: number[];

    // @IsNotEmpty()
    // readonly sales: number[];

    // @IsNotEmpty()
    // readonly quantities: number[];
}
