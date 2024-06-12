import { Controller, Get, Post, Body } from "@nestjs/common";
import SuccessResponse from "types/success";
import { PrivacyDTO } from "./dto/privacy.dto";
import { PrivacyService } from "./privacy.service";

@Controller("privacy")
export class PrivacyController {
    constructor(private readonly privacyService: PrivacyService) {}

    @Get()
    async getPrivacy(): Promise<SuccessResponse> {
        return await this.privacyService.getPrivacy();
    }

    @Post("")
    async updatePrivacy(@Body() body: PrivacyDTO): Promise<SuccessResponse> {
        return await this.privacyService.updatePrivacy(body);
    }
}
