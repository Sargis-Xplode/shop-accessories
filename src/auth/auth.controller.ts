import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import SuccessResponse from "types/success.interface";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

export interface LoginDTO {
    email: string;
    password: string;
}

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    @UseGuards(AuthGuard("jwt"))
    async getAdminData(@Req() req: Request): Promise<SuccessResponse> {
        const token = req.headers.authorization.split(" ")[1];
        return this.authService.getAdminData(token, req);
    }

    @Post("login")
    async login(@Body() body: LoginDTO): Promise<SuccessResponse> {
        return this.authService.login(body);
    }

    // @Post("register")
    // async register(@Body() body: AuthUpdatePasswordDTO): Promise<SuccessResponse> {
    //     return this.authService.register(body);
    // }

    // @Post("password")
    // @UseGuards(AuthGuard("jwt"))
    // async changePassword(@Body() body: AuthUpdatePasswordDTO, @Req() request: Request): Promise<SuccessResponse> {
    //     const jwt = request.headers.authorization.replace("Bearer ", "");
    //     return this.authService.changePassword(body, jwt);
    // }
}
