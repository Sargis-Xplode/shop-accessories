import { Injectable } from "@nestjs/common";
import { AdminsModel } from "./auth.model";
import { AuthUpdatePasswordDTO } from "./dto/auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

require("dotenv").config();

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AdminsModel.name) private readonly adminsModel: Model<AdminsModel>,
        private readonly jwtService: JwtService
    ) {}

    generateAccessToken(email: string): string {
        return this.jwtService.sign({ email });
    }

    async login(body: any) {
        const { email, password } = body;
        const admin = await this.adminsModel.findOne({ email });
        // const token = this.generateAccessToken(email);
        if (admin) {
            if (await bcrypt.compare(password, admin.password))
                return {
                    success: true,
                    message: "Logged in successfully",
                    access_token: null,
                };
            else {
                return {
                    success: false,
                    message: "Invalid credentials",
                    access_token: null,
                };
            }
        } else {
            return {
                success: false,
                message: "Invalid credentials",
                access_token: null,
            };
        }
    }
}
