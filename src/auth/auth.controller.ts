// auth.controller.ts
import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUpdatePasswordDTO } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Req() req: any): Promise<any> {
        return {
            access_token: this.authService.login(req.user),
        };
    }

    @Put("password")
    async changePassword(@Req() req: any, @Body() data: AuthUpdatePasswordDTO): Promise<any> {
        return this.authService.changePassword(req.user.sub, data);
    }
}
