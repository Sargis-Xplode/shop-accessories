import { Controller, Get, Post, Body, Delete, Query, Put, Param } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { ProductService } from "./product.service";
import { ProductDTO } from "./dto/product.dto";

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getProducts(
        @Query("page") page: string,
        @Query("limit") limit: string,
        @Query("id") id: string
    ): Promise<SuccessResponse> {
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        if (id) {
            return await this.productService.getSingleProduct(id);
        } else {
            return await this.productService.getProducts(pageNumber, limitNumber);
        }
    }

    @Post()
    async createProduct(@Body() body: ProductDTO): Promise<SuccessResponse> {
        return await this.productService.createProduct(body);
    }

    @Put(":id")
    async updateProduct(@Param("id") id: string, @Body() body: ProductDTO): Promise<SuccessResponse> {
        return await this.productService.updateProduct(id, body);
    }

    @Delete(":id")
    async deleteProduct(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.productService.deleteProduct(id);
    }
}
