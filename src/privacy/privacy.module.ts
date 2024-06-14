import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Privacy, PrivacySchema } from "./privacy.model";
import { PrivacyController } from "./privacy.controller";
import { PrivacyService } from "./privacy.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Privacy.name, schema: PrivacySchema }])],
    controllers: [PrivacyController],
    providers: [PrivacyService],
})
export class PrivacyModule {}
