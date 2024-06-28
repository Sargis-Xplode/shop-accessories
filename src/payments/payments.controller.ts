import { Body, Controller, Get, Post } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
    constructor(private readonly paymentService: PaymentsService) {}

    @Get("success")
    async success(@Body() body: any): Promise<SuccessResponse> {
        return await this.paymentService.success(body);
    }

    @Get("cancel")
    async cancel(@Body() body: any): Promise<SuccessResponse> {
        return await this.paymentService.cancel(body);
    }
}
