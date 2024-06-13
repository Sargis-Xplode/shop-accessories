import { Controller, Get, Post, Body, Param, Query, Delete, Put } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { FilterMaterialDTO } from "./dto/filter-material.dto";
import { FilterMaterialService } from "./filter-material.service";

@Controller("filter/material")
export class FilterMaterialController {
    constructor(private readonly filterMaterialService: FilterMaterialService) {}

    @Get()
    async getFilterMaterial(): Promise<SuccessResponse> {
        return await this.filterMaterialService.getFilterMaterial();
    }

    @Post("")
    async createFilterMaterial(@Body() body: FilterMaterialDTO): Promise<SuccessResponse> {
        return await this.filterMaterialService.createFilterMaterial(body);
    }

    @Put(":id")
    async updateFilterMaterial(@Param("id") id: string, @Body() body: FilterMaterialDTO): Promise<SuccessResponse> {
        return await this.filterMaterialService.updateFilterMaterial(id, body);
    }

    @Put(":id/active")
    async toggleActive(@Param("id") id: string, @Query("active") active: boolean): Promise<SuccessResponse> {
        return await this.filterMaterialService.toggleActive(id, active);
    }

    @Delete(":id")
    async deleteFilterMaterial(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.filterMaterialService.deleteFilterMaterial(id);
    }
}
