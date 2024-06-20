import { Controller, Get, Query } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { ProductService } from "./product.service";

@Controller("product/search")
export class ProductSearchontroller {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getProducts(
        @Query("page") page: string,
        @Query("limit") limit: string,
        @Query("category_id") category_id: string,
        @Query("collection_id") collection_id: string,
        @Query("subcategories") subcategories: string[],
        @Query("materials") materials: string[],
        @Query("styles") styles: string[],
        @Query("occasions") occasions: string[],
        @Query("min_price") min_price: number,
        @Query("max_price") max_price: number,
        @Query("sort_by") sort_by: string,
        @Query("sort_type") sort_type: string,
        @Query("sale") sale: boolean,
        @Query("search_term") search_term: string,
        @Query("in_stock") in_stock: boolean,
        @Query("active") active: boolean
    ): Promise<SuccessResponse> {
        return await this.productService.searchProducts(
            parseInt(page) || 1,
            parseInt(limit) || 10,
            category_id,
            collection_id,
            subcategories || [],
            materials || [],
            styles || [],
            occasions || [],
            sale || false,
            min_price || 0,
            max_price,
            sort_by,
            sort_type || "asc",
            search_term || "",
            in_stock,
            active || true
        );
    }
}
