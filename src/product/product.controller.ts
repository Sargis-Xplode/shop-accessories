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

    @Get("seasonal")
    async getSeasonalProducts(@Query("page") page: string, @Query("limit") limit: string): Promise<SuccessResponse> {
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        return await this.productService.getSeasonalProducts(pageNumber, limitNumber);
    }

    @Get("new")
    async getNewArrivalProducts(@Query("page") page: string, @Query("limit") limit: string): Promise<SuccessResponse> {
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        return await this.productService.getNewArrivalProducts(pageNumber, limitNumber);
    }

    @Get(":id/similar")
    async getSimilarProducts(
        @Param("id") id: string,
        @Query("category_id") category_id: string,
        @Query("collection_id") collection_id: string,
        @Query("page") page: string,
        @Query("limit") limit: string
    ): Promise<SuccessResponse> {
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 3;
        return await this.productService.getSimilarProducts(pageNumber, limitNumber, id, category_id, collection_id);
    }

    @Get("featured")
    async getFeaturedProducts(
        @Query("active") active: string,
        @Query("page") page: string,
        @Query("limit") limit: string
    ): Promise<SuccessResponse> {
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 5;
        return await this.productService.getFeaturedProducts(pageNumber, limitNumber);
    }

    @Get("best-seller")
    async getBestSellerProducts(
        @Query("active") active: string,
        @Query("page") page: string,
        @Query("limit") limit: string
    ): Promise<SuccessResponse> {
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        return await this.productService.getBestSellerProducts(pageNumber, limitNumber, active);
    }

    @Post()
    async createProduct(@Body() body: ProductDTO): Promise<SuccessResponse> {
        return await this.productService.createProduct(body);
    }

    @Put(":id")
    async updateProduct(@Param("id") id: string, @Body() body: ProductDTO): Promise<SuccessResponse> {
        return await this.productService.updateProduct(id, body);
    }

    @Put(":id/seasonal")
    async toggleProductActive(@Param("id") id: string, @Query("active") active: string): Promise<SuccessResponse> {
        return await this.productService.toggleProductActive(id, active);
    }

    @Delete(":id")
    async deleteProduct(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.productService.deleteProduct(id);
    }
}
