import { Controller, Post, Get, Delete, Param } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import Success from "utils/success-response";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
    constructor(private readonly contactService: OrdersService) {}

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.contactService.delete(id);
    }
}
