import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { CollectionsService } from "./collections.service";
import SuccessResponse from "types/success";
import { CollectionsDTO } from "./dto/collections.dto";

@Controller("collections")
export class CollectionsController {
    constructor(private readonly collectionsService: CollectionsService) {}

    @Get()
    async getCollections(@Query("page") page: string, @Query("limit") limit: string): Promise<SuccessResponse> {
        return await this.collectionsService.getCollections(parseInt(page) || 1, parseInt(limit) || 10);
    }

    @Post("")
    async updateCollections(@Body() body: CollectionsDTO): Promise<SuccessResponse> {
        return await this.collectionsService.updateCollections(body);
    }

    @Post(":id")
    async deleteCollection(@Param("id") id: string, @Body() body: CollectionsDTO): Promise<SuccessResponse> {
        return await this.collectionsService.deleteCollection(id, body);
    }
}
