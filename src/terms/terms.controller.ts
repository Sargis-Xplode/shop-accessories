import { Controller, Get, Post, Body } from "@nestjs/common";
import { TermsService } from "./terms.service";
import SuccessResponse from "types/success.interface";
import { TermsDTO } from "./dto/terms.dto";

@Controller("terms")
export class TermsController {
    constructor(private readonly termsService: TermsService) {}

    @Get()
    async getTerms(): Promise<SuccessResponse> {
        return await this.termsService.getTerms();
    }

    @Post("")
    async updateTerms(@Body() body: TermsDTO): Promise<SuccessResponse> {
        return await this.termsService.updateTerms(body);
    }
}
