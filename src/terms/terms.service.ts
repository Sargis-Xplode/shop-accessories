import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import SuccessResponse from "types/success.interface";
import { Terms } from "./terms.model";
import { TermsDTO } from "./dto/terms.dto";
import { Success } from "utils/success-response";

@Injectable()
export class TermsService {
    constructor(
        @InjectModel(Terms.name)
        private readonly termsModel: Model<Terms>
    ) {}

    async getTerms(): Promise<SuccessResponse> {
        let terms: Terms | null = await this.termsModel.findOne();
        if (!terms) {
            terms = await this.createDefaultTerms();
        }
        return Success(true, "Successful", terms);
    }

    async createDefaultTerms(): Promise<Terms> {
        const terms = await this.termsModel.create({
            description_arm: "",
            description_eng: "",
            image: "",
        });
        return terms;
    }

    async updateTerms(body: TermsDTO) {
        const { description_arm, description_eng } = body;
        const terms = await this.termsModel.findOne();
        if (terms) {
            terms.description_arm = description_arm;
            terms.description_eng = description_eng;

            await terms.save();

            return Success(true, "Terms updated successfully", terms);
        } else {
            const terms = await this.termsModel.create({
                description_arm,
                description_eng,
            });

            return Success(true, "Terms updated successfully", terms);
        }
    }
}
