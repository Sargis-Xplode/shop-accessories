import { Controller, Get } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { CategoriesService } from "./categories.service";

@Controller("filters")
export class FiltersController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async getFiltes(): Promise<SuccessResponse> {
        return await this.categoriesService.getFilters();
    }
}
