// auth.controller.ts
import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUpdatePasswordDTO } from "./dto/auth.dto";

interface AdminLoginDTO {
    success: boolean;
    message: string;
    access_token: string;
}

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Body() body: any): Promise<AdminLoginDTO> {
        return this.authService.login(body);
    }

    @Put("password")
    async changePassword(@Req() req: any, @Body() data: AuthUpdatePasswordDTO): Promise<any> {
        return this.authService.changePassword(req.user.sub, data);
    }
}
