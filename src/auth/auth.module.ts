import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { adminsModelSchema, AdminsModel } from "./auth.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: AdminsModel.name, schema: adminsModelSchema }])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
