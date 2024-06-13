import { Injectable } from "@nestjs/common";
import { AdminsModel } from "./auth.model";
import { AuthUpdatePasswordDTO } from "./dto/auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { LoginDTO } from "./auth.controller";
import { Success } from "lib/success";

require("dotenv").config();

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AdminsModel.name) private readonly adminsModel: Model<AdminsModel>,
        private readonly jwtService: JwtService
    ) {}

    async login(body: LoginDTO) {
        const { email, password } = body;
        const admin = await this.adminsModel.findOne({ email });
        const token = this.jwtService.sign({ email });
        if (admin) {
            if (await bcrypt.compare(password, admin.password))
                return Success(true, "Logged in successfully", {
                    access_token: token,
                });
            else {
                return Success(false, "Incorrect password", null);
            }
        } else {
            return Success(false, `No user registered with email ${email}`, null);
        }
    }

    async register(body: LoginDTO) {
        const { email, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.adminsModel.create({ email, password: hashedPassword });
        return Success(true, "Successfully registered", null);
    }

    async changePassword(body: AuthUpdatePasswordDTO, token: string) {
        const { password, new_password } = body;

        const adminDecoded = this.jwtService.decode(token);
        if (!adminDecoded) {
            return Success(false, "Unauthorized", null);
        }
        const admin = await this.adminsModel.findOne({ email: adminDecoded.email });

        if (admin) {
            const validPassword = await bcrypt.compare(password, admin.password);
            if (validPassword) {
                admin.password = await bcrypt.hash(new_password, 10);
                await admin.save();
                return Success(true, "Password changed successfully", null);
            } else {
                return Success(false, "Current password mismatch", null);
            }
        } else {
            return Success(false, "Password wasn't changed", null);
        }
    }
}
