import { Controller, Get, Query } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { ProductService } from "./product.service";
import { ObjectId } from "mongoose";

@Controller("product/search")
export class ProductSearchontroller {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getProducts(
        @Query("page") page: string,
        @Query("limit") limit: string,
        @Query("category_id") category_id: ObjectId,
        @Query("subcategories") subcategories: string[],
        @Query("materials") materials: string[],
        @Query("styles") styles: string[],
        @Query("occasions") occasions: string[],
        @Query("sort") sort: string
    ): Promise<SuccessResponse> {
        return await this.productService.searchProducts(
            parseInt(page) || 1,
            parseInt(limit) || 10,
            category_id,
            subcategories,
            materials,
            styles,
            occasions,
            sort
        );
    }
}
