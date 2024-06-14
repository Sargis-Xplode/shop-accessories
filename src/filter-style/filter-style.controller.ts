import { Controller, Get, Post, Body, Param, Query, Delete, Put } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { FilterStyleDTO } from "./dto/filter-style.dto";
import { FilterStyleService } from "./filter-style.service";

@Controller("filter/style")
export class FilterStyleController {
    constructor(private readonly filterStyleService: FilterStyleService) {}

    @Get()
    async getFilterStyle(): Promise<SuccessResponse> {
        return await this.filterStyleService.getFilterStyle();
    }

    @Post("")
    async createFilterStyle(@Body() body: FilterStyleDTO): Promise<SuccessResponse> {
        return await this.filterStyleService.createFilterStyle(body);
    }

    @Put(":id")
    async updateFilterStyle(@Param("id") id: string, @Body() body: FilterStyleDTO): Promise<SuccessResponse> {
        return await this.filterStyleService.updateFilterStyle(id, body);
    }

    @Put(":id/active")
    async toggleActive(@Param("id") id: string, @Query("active") active: string): Promise<SuccessResponse> {
        return await this.filterStyleService.toggleActive(id, active);
    }

    @Delete(":id")
    async deleteFilterStyle(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.filterStyleService.deleteFilterStyle(id);
    }
}
