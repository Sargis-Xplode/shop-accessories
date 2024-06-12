import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import SuccessResponse from "types/success";
import { Success } from "utils/success";
import { FAQModel } from "./faq.model";
import { FAQDTO } from "./dto/faq.dto";

@Injectable()
export class FAQService {
    constructor(
        @InjectModel(FAQModel.name)
        private readonly faqModel: Model<FAQModel>
    ) {}

    async getFAQ() {
        try {
            const faqs = await this.faqModel.find();
            console.log(faqs);
            if (faqs.length) {
                return Success(true, "Successful", faqs);
            } else {
                return Success(true, "FAQ is empty", null);
            }
        } catch (err) {
            return Success(false, "Couldn't find FAQs", null);
        }
    }

    async createFAQ(body: FAQDTO) {
        const { question_arm, question_eng, answer_arm, answer_eng } = body;

        const faq = await this.faqModel.create({
            question_arm,
            question_eng,
            answer_arm,
            answer_eng,
        });
        if (faq) {
            return Success(true, "Successfully created", faq);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async updateFAQ(id: string, body: FAQDTO) {
        const { question_arm, question_eng, answer_arm, answer_eng } = body;

        const faq = await this.faqModel.findById(id);
        if (faq) {
            faq.question_arm = question_arm;
            faq.question_eng = question_eng;
            faq.answer_arm = answer_arm;
            faq.answer_eng = answer_eng;

            await faq.save();
            return Success(true, "Successfully updated", faq);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async deleteFAQ(id: string): Promise<SuccessResponse> {
        try {
            await this.faqModel.findByIdAndDelete(id);
            return Success(true, "Successfully deleted", null);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }
}
