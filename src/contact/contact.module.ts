import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { ContactModel, ContactSchema } from "./contact.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: ContactModel.name, schema: ContactSchema }])],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {}
