import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { adminsModelSchema, AdminsModel } from "./auth.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

require("dotenv").config();

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AdminsModel.name, schema: adminsModelSchema }]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: process.env.JWT_KEY,
            signOptions: {
                expiresIn: "8h",
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
