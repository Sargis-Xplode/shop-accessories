import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUpdatePasswordDTO } from "./dto/auth.dto";
import { Request } from "express";
import SuccessResponse from "types/success";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Body() body: any): Promise<SuccessResponse> {
        return this.authService.login(body);
    }

    // @Post("register")
    // async register(@Body() body: AuthUpdatePasswordDTO): Promise<SuccessResponse> {
    //     return this.authService.register(body);
    // }

    @Post("password")
    // @UseGuards(AuthGuard("jwt"))
    async changePassword(@Body() body: AuthUpdatePasswordDTO, @Req() request: Request): Promise<SuccessResponse> {
        const jwt = request.headers.authorization.replace("Bearer ", "");
        return this.authService.changePassword(body, jwt);
    }
}
