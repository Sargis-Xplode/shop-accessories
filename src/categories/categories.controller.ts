import { Controller, Get, Post, Body, Param, Query, Delete, Put } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { CategoriesDTO } from "./dto/categories.dto";
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async getCategories(): Promise<SuccessResponse> {
        return await this.categoriesService.getCategories();
    }

    @Post("")
    async createCategories(@Body() body: CategoriesDTO): Promise<SuccessResponse> {
        return await this.categoriesService.createCategories(body);
    }

    @Put(":id")
    async updateCategories(@Param("id") id: string, @Body() body: CategoriesDTO): Promise<SuccessResponse> {
        return await this.categoriesService.updateCategories(id, body);
    }

    @Put(":id/active")
    async toggleActive(@Param("id") id: string, @Query("active") active: string): Promise<SuccessResponse> {
        return await this.categoriesService.toggleActive(id, active);
    }

    @Delete(":id")
    async deleteCategories(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.categoriesService.deleteCategories(id);
    }
}
