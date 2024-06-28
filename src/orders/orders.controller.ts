import { Controller, Post, Get, Delete, Param, Query, Put, Body, UseGuards, Req } from "@nestjs/common";
import SuccessResponse from "types/success.interface";
import { OrdersService } from "./orders.service";
import { OrderDTO } from "./dto/orders.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller("orders")
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @Get()
    async getOrders(@Query("page") page: string, @Query("limit") limit: string): Promise<SuccessResponse> {
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        return await this.orderService.getOrders(pageNumber, limitNumber);
    }

    @Post("")
    async createOrder(@Body() body: OrderDTO, @Req() req: Request): Promise<SuccessResponse> {
        const origin = req.headers.origin || req.headers.referer;
        return await this.orderService.createOrder(body);
    }

    @Put(":id")
    @UseGuards(AuthGuard("jwt"))
    async updateStatus(@Param("id") id: string, @Query("status") status: string): Promise<SuccessResponse> {
        return await this.orderService.updateStatus(id, parseInt(status));
    }

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    async delete(@Param("id") id: string): Promise<SuccessResponse> {
        return await this.orderService.delete(id);
    }
}
