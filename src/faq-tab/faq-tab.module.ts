import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FAQTabController } from "./faq-tab.controller";
import { FAQTabService } from "./faq-tab.service";
import { FAQTabModel, faqTabModelSchema } from "./faq-tab.model";
import { FAQModel, faqModelSchema } from "src/faq/faq.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: FAQTabModel.name, schema: faqTabModelSchema }]),
        MongooseModule.forFeature([{ name: FAQModel.name, schema: faqModelSchema }]),
    ],
    controllers: [FAQTabController],
    providers: [FAQTabService],
})
export class FAQTabModule {}
