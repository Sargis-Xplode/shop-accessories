import { Controller, Get, Post, Body } from "@nestjs/common";
import { ContactUsInfoService } from "./contact-us-info.service";
import SuccessResponse from "types/success";
import { ContactUsInfoDTO } from "./dto/contact-us-info.dto";

@Controller("contact-us-info")
export class ContactUsInfoController {
    constructor(private readonly contactUsInfoService: ContactUsInfoService) {}

    @Get()
    async getContactUsInfo(): Promise<SuccessResponse> {
        return await this.contactUsInfoService.getContactUsInfo();
    }

    @Post("")
    async updateContactUsInfo(@Body() body: ContactUsInfoDTO): Promise<SuccessResponse> {
        return await this.contactUsInfoService.updateContactUsInfo(body);
    }
}
