import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { ContactUsInfoService } from "./contact-us-info.service";
import SuccessResponse from "types/success.interface";
import { ContactUsInfoDTO } from "./dto/contact-us-info.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("contact-us-info")
export class ContactUsInfoController {
    constructor(private readonly contactUsInfoService: ContactUsInfoService) {}

    @Get()
    async getContactUsInfo(): Promise<SuccessResponse> {
        return await this.contactUsInfoService.getContactUsInfo();
    }

    @Post("")
    @UseGuards(AuthGuard("jwt"))
    async updateContactUsInfo(@Body() body: ContactUsInfoDTO): Promise<SuccessResponse> {
        return await this.contactUsInfoService.updateContactUsInfo(body);
    }
}
