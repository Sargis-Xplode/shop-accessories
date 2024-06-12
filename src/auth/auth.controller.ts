import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUpdatePasswordDTO } from "./dto/auth.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import Success from "types/success";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Body() body: any): Promise<Success> {
        return this.authService.login(body);
    }

    @Post("password")
    // @UseGuards(AuthGuard("jwt"))
    async changePassword(@Body() body: AuthUpdatePasswordDTO, @Req() request: Request): Promise<Success> {
        const jwt = request.headers.authorization.replace("Bearer ", "");
        return this.authService.changePassword(body, jwt);
    }
}
