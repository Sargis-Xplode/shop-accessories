import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FAQController } from "./faq.controller";
import { FAQService } from "./faq.service";
import { FAQModel, faqModelSchema } from "./faq.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: FAQModel.name, schema: faqModelSchema }])],
    controllers: [FAQController],
    providers: [FAQService],
})
export class FAQModule {}
