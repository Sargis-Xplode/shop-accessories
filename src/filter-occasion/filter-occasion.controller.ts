import { Controller, Get, Post, Body, Param, Query, Delete, Put } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { FilterOccasionDTO } from "./dto/filter-occasion.dto";
import { FilterOccasionService } from "./filter-occasion.service";

@Controller("filter/occasion")
export class FilterOccasionController {
    constructor(private readonly filterOccasionService: FilterOccasionService) {}

    @Get()
    async getFilterOccasion(): Promise<SuccessResponse> {
        return await this.filterOccasionService.getFilterOccasion();
    }

    @Post("")
    async createFilterOccasion(@Body() body: FilterOccasionDTO): Promise<SuccessResponse> {
        return await this.filterOccasionService.createFilterOccasion(body);
    }

    @Put(":id")
    async updateFilterOccasion(@Param("id") id: string, @Body() body: FilterOccasionDTO): Promise<SuccessResponse> {
        return await this.filterOccasionService.updateFilterOccasion(id, body);
    }

    @Put(":id/active")
    async toggleActive(@Param("id") id: string, @Query("active") active: boolean): Promise<SuccessResponse> {
        return await this.filterOccasionService.toggleActive(id, active);
    }

    @Delete(":id")
    async deleteFilterOccasion(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.filterOccasionService.deleteFilterOccasion(id);
    }
}
