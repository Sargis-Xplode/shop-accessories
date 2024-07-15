import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import SuccessResponse from "types/success.interface";
import { FAQTabModel } from "./faq-tab.model";
import { FAQTabDTO } from "./dto/faq-tab.dto";
import { Pagination } from "mongoose-paginate-ts";
import Success from "../../utils/success-response";
import { FAQModel } from "src/faq/faq.model";

@Injectable()
export class FAQTabService {
    constructor(
        @InjectModel(FAQTabModel.name)
        private readonly faqTabModel: Pagination<FAQTabModel>,

        @InjectModel(FAQModel.name)
        private readonly faqModel: Pagination<FAQModel>
    ) {}

    async getFAQTabs(): Promise<SuccessResponse> {
        try {
            const data = await this.faqTabModel.find();
            return Success(true, "Successful", data);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }

    async createFAQTab(body: FAQTabDTO): Promise<SuccessResponse> {
        const { name_arm, name_eng } = body;

        try {
            const data = await this.faqTabModel.create({
                name_arm,
                name_eng,
            });

            return Success(true, "Successful", data);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }

    async updateFAQTab(body: FAQTabDTO, id: string): Promise<SuccessResponse> {
        const { name_arm, name_eng } = body;

        try {
            const tab = await this.faqTabModel.findById(id);
            tab.name_arm = name_arm;
            tab.name_eng = name_eng;

            await tab.save();

            return Success(true, "Successful", null);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }

    a;

    async deleteFAQ(id: string): Promise<SuccessResponse> {
        try {
            await this.faqModel.deleteMany({ tab_id: id });
            await this.faqTabModel.findByIdAndDelete(id);
            return Success(true, "Successfully deleted", null);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }
}
