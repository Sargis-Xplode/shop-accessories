import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { AdminsModel } from "./auth.model";
import { AuthUpdatePasswordDTO } from "./dto/auth.dto";
import { AuthPayloadInterface } from "utils/jwt/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AdminsModel.name) private readonly adminsModel: Model<AdminsModel>,
        private readonly jwtService: JwtService
    ) {}

    generateAccessToken(id: string): string {
        return this.jwtService.sign({ sub: id });
    }

    login(admin: AuthPayloadInterface) {
        return this.generateAccessToken(admin.sub);
    }

    async validateAdmin(username: string, password: string): Promise<any> {
        const admin = await this.adminsModel.findOne({ username }).exec();

        if (!admin) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return null;
        }

        return admin;
    }

    async changePassword(userId: string, data: AuthUpdatePasswordDTO): Promise<any> {
        const user = await this.adminsModel.findById(userId).select("+password").exec();
        if (!user) {
            throw new NotFoundException("User not found");
        }

        const isPasswordValid = await bcrypt.compare(data.current_password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid current password");
        }

        const hashedNewPassword = await bcrypt.hash(data.new_password, 10);
        await this.adminsModel.findByIdAndUpdate(userId, {
            password: hashedNewPassword,
        });

        return {
            success: true,
        };
    }
}
