import { Controller, Get, Post, Body, Delete, Query, Put, Param, UseGuards } from "@nestjs/common";
import { FAQService } from "./faq.service";
import SuccessResponse from "types/success.interface";
import { FAQDTO } from "./dto/faq.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("faq-item")
export class FAQController {
    constructor(private readonly faqService: FAQService) {}

    @Get("")
    async getFAQ(): Promise<SuccessResponse> {
        return await this.faqService.getFAQ();
    }

    @Post("")
    @UseGuards(AuthGuard("jwt"))
    async createFAQ(@Body() body: FAQDTO): Promise<SuccessResponse> {
        return await this.faqService.createFAQ(body);
    }

    @Put(":id")
    @UseGuards(AuthGuard("jwt"))
    async updateFAQ(@Body() body: FAQDTO, @Param("id") id: string): Promise<SuccessResponse> {
        return await this.faqService.updateFAQ(body, id);
    }

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    async deleteFAQ(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.faqService.deleteFAQ(id);
    }
}
