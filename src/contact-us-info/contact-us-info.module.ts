import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContactUsInfoController } from "./contact-us-info.controller";
import { ContactUsInfoService } from "./contact-us-info.service";
import { ContactUsInfo, ContactUsInfoSchema } from "./contact-us-info.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: ContactUsInfo.name, schema: ContactUsInfoSchema }])],
    controllers: [ContactUsInfoController],
    providers: [ContactUsInfoService],
})
export class ContactUsInfoModule {}
