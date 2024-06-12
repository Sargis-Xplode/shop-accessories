import { Controller, Get, Post, Body, Delete, Query, Put, Param } from "@nestjs/common";
import { FAQService } from "./faq.service";
import SuccessResponse from "types/success";
import { FAQDTO } from "./dto/faq.dto";

@Controller("faq")
export class FAQController {
    constructor(private readonly faqService: FAQService) {}

    @Get()
    async getFAQ(): Promise<SuccessResponse> {
        return await this.faqService.getFAQ();
    }

    @Post("")
    async createFAQ(@Body() body: FAQDTO): Promise<SuccessResponse> {
        return await this.faqService.createFAQ(body);
    }

    @Put(":id")
    async updateFAQ(@Param("id") id: string, @Body() body: FAQDTO): Promise<SuccessResponse> {
        return await this.faqService.updateFAQ(id, body);
    }

    @Delete(":id")
    async deleteFAQ(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.faqService.deleteFAQ(id);
    }
}
