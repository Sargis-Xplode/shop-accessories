import { Controller, Post, Get, Delete, Param } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { ContactDTO } from "./dto/contact.dto";
import SuccessResponse from "types/success.interface";
import Success from "utils/success-response";

@Controller("contacts")
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    // @Get()
    // async findAll(
    //     @Query("page") page: string,
    //     @Query("term") term: string,
    //     @Query("order_by") orderBy: string,
    //     @Query("order_type") orderType: string
    // ): Promise<SuccessResponse> {
    //     return await this.contactService.findAll(parseInt(page) || 1, term || "", orderBy || "", orderType || "asc");
    // }

    // @Post()
    // async create(@Body() contactData: ContactDTO): Promise<SuccessResponse> {
    //     return this.contactService.create(contactData);
    // }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.contactService.delete(id);
    }
}
