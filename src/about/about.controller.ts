import { Controller, Get, Post, Body } from "@nestjs/common";
import { AboutService } from "./about.service";
import { AboutDTO } from "./dto/about.dto";
import SuccessResponse from "types/success.interface";

@Controller("about")
export class AboutController {
    constructor(private readonly aboutService: AboutService) {}

    @Get()
    async getAbout(): Promise<SuccessResponse> {
        return await this.aboutService.getAbout();
    }

    @Post("")
    async updateAbout(@Body() body: AboutDTO): Promise<SuccessResponse> {
        return await this.aboutService.updateAbout(body);
    }
}
