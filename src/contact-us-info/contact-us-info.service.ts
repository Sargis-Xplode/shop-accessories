import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import SuccessResponse from "types/success.interface";
import { ContactUsInfoDTO } from "./dto/contact-us-info.dto";
import { ContactUsInfo } from "./contact-us-info.model";
import { Success } from "utils/success-response";

@Injectable()
export class ContactUsInfoService {
    constructor(
        @InjectModel(ContactUsInfo.name)
        private readonly contactUsInfoModel: Model<ContactUsInfo>
    ) {}

    async getContactUsInfo(): Promise<SuccessResponse> {
        let contactUsInfo: ContactUsInfo | null = await this.contactUsInfoModel.findOne();
        if (!contactUsInfo) {
            contactUsInfo = await this.createDefaultContactusInfo();
        }
        return Success(true, "Successful", contactUsInfo);
    }

    async createDefaultContactusInfo(): Promise<ContactUsInfo> {
        const contactUsInfo = await this.contactUsInfoModel.create({
            description_arm: "",
            description_eng: "",
            image: "",
        });
        return contactUsInfo;
    }

    async updateContactUsInfo(body: ContactUsInfoDTO) {
        const { description_arm, description_eng } = body;
        const contactUsInfo = await this.contactUsInfoModel.findOne();
        if (contactUsInfo) {
            contactUsInfo.description_arm = description_arm;
            contactUsInfo.description_eng = description_eng;

            await contactUsInfo.save();

            return Success(true, "Contact us updated successfully", contactUsInfo);
        } else {
            const contactUsInfo = await this.contactUsInfoModel.create({
                description_arm,
                description_eng,
            });

            return Success(true, "Contact us updated successfully", contactUsInfo);
        }
    }
}
