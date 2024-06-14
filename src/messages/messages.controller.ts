// message.controller.ts
import { Controller, Get, Delete, Param, UseGuards, Query, Post, Body, Put, Req } from "@nestjs/common";
import { MessageService } from "./messages.service";
import { ConnectionCreateDTO } from "./dto/connection.dto";
import { AttachmentDTO } from "./dto/attachements.dto";

@Controller("connections")
export class MessageController {
    constructor(private readonly messaegService: MessageService) {}

    // @Get("search")
    // async searchConnections(
    //     @Query("page") page: string,
    //     @Query("term") term: string,
    //     @Query("order_type") orderType: string
    // ): Promise<Success> {
    //     return success(
    //         await this.messaegService.searchConnections(parseInt(page) || 1, term || "", orderType || "desc")
    //     );
    // }

    // @Get("new")
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(RoleAdmin)
    // async findNewConnections(@Query("page") page: string): Promise<Success> {
    //     return success(await this.messaegService.findNewConnections(parseInt(page) || 1));
    // }

    // @Get(":id/messages")
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(RoleAdmin)
    // async findMessagsByConnectionId(@Param("id") id: string, @Query("page") page: string): Promise<Success> {
    //     return success(await this.messaegService.findMessagsByConnectionId(id, parseInt(page) || 1));
    // }

    // @Get("messages")
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(RoleMessageUser)
    // async findUserConnectionMessages(@Req() req: JJRequest, @Query("page") page: string): Promise<Success> {
    //     return success(await this.messaegService.findMessagsByConnectionId(req.user.sub, parseInt(page) || 1));
    // }

    // @Post()
    // async createConnection(@Body() body: ConnectionCreateDTO): Promise<Success> {
    //     return await this.messaegService.createConnection(body);
    // }

    // @Post("attachment")
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(RoleMessageUser)
    // async addAttachment(@Body() body: AttachmentDTO): Promise<Success> {
    //     return await this.messaegService.addAttachment(body.name);
    // }

    // @Put(":id/end")
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(RoleAdmin)
    // async endConnection(@Param("id") id: string): Promise<Success> {
    //     return await this.messaegService.endConnection(id);
    // }

    // @Delete(":id")
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(RoleAdmin)
    // async deleteConnection(@Param("id") id: string): Promise<Success> {
    //     return await this.messaegService.deleteConnection(id);
    // }
}
