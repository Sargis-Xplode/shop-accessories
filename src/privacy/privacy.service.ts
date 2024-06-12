import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import SuccessResponse from "types/success";
import { Success } from "utils/success";
import { Privacy } from "./privacy.model";
import { PrivacyDTO } from "./dto/privacy.dto";

@Injectable()
export class PrivacyService {
    constructor(
        @InjectModel(Privacy.name)
        private readonly privacyModel: Model<Privacy>
    ) {}

    async getPrivacy(): Promise<SuccessResponse> {
        let privacy: Privacy | null = await this.privacyModel.findOne();
        if (!privacy) {
            privacy = await this.createDefaultPrivacy();
        }
        return Success(true, "Successful", privacy);
    }

    async createDefaultPrivacy(): Promise<Privacy> {
        const privacy = await this.privacyModel.create({
            description_arm: "",
            description_eng: "",
        });
        return privacy;
    }

    async updatePrivacy(body: PrivacyDTO) {
        const { description_arm, description_eng } = body;
        const privacy = await this.privacyModel.findOne();
        if (privacy) {
            privacy.description_arm = description_arm;
            privacy.description_eng = description_eng;

            await privacy.save();

            return Success(true, "Privacy updated successfully", privacy);
        } else {
            const privacy = await this.privacyModel.create({
                description_arm,
                description_eng,
            });

            return Success(true, "Privacy updated successfully", privacy);
        }
    }
}
