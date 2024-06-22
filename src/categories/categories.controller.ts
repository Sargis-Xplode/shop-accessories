import { Controller, Get, Post, Body, Param, Query, Delete, Put, UseGuards } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { CategoriesDTO } from "./dto/categories.dto";
import { CategoriesService } from "./categories.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async getCategories(): Promise<SuccessResponse> {
        return await this.categoriesService.getCategories();
    }

    @Post("")
    @UseGuards(AuthGuard("jwt"))
    async createCategories(@Body() body: CategoriesDTO): Promise<SuccessResponse> {
        return await this.categoriesService.createCategories(body);
    }

    @Put(":id")
    @UseGuards(AuthGuard("jwt"))
    async updateCategories(@Param("id") id: string, @Body() body: CategoriesDTO): Promise<SuccessResponse> {
        return await this.categoriesService.updateCategories(id, body);
    }

    @Put(":id/active")
    @UseGuards(AuthGuard("jwt"))
    async toggleActive(@Param("id") id: string, @Query("active") active: string): Promise<SuccessResponse> {
        return await this.categoriesService.toggleActive(id, active);
    }

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    async deleteCategories(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.categoriesService.deleteCategories(id);
    }
}
