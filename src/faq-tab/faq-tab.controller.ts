import { Controller, Get, Post, Body, Delete, Query, Put, Param, UseGuards } from "@nestjs/common";
import { FAQTabService } from "./faq-tab.service";
import SuccessResponse from "types/success.interface";
import { FAQTabDTO } from "./dto/faq-tab.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("faq")
export class FAQTabController {
    constructor(private readonly faqService: FAQTabService) {}

    @Get("")
    async getFAQTabs(): Promise<SuccessResponse> {
        return await this.faqService.getFAQTabs();
    }

    @Post("")
    async createFAQTab(@Body() body: FAQTabDTO): Promise<SuccessResponse> {
        return await this.faqService.createFAQTab(body);
    }

    @Put(":id")
    async updateFAQTab(@Body() body: FAQTabDTO, @Param("id") id: string): Promise<SuccessResponse> {
        return await this.faqService.updateFAQTab(body, id);
    }

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    async deleteFAQ(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.faqService.deleteFAQ(id);
    }
}
