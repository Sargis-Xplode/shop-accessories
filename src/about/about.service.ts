import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { About } from "./about.model";
import { AboutDTO } from "./dto/about.dto";
import SuccessResponse from "types/success.interface";
import Success from "../../utils/success-response";

@Injectable()
export class AboutService {
    constructor(
        @InjectModel(About.name)
        private readonly aboutModel: Model<About>
    ) {}

    async getAbout(): Promise<SuccessResponse> {
        let about = await this.aboutModel.findOne<About>();
        if (!about) {
            about = await this.createDefaultAbout();
        }
        return Success(true, "Successful", about);
    }

    async createDefaultAbout(): Promise<About> {
        const about = await this.aboutModel.create({
            description_arm: "",
            description_eng: "",
            image: "",
        });
        return about;
    }

    async updateAbout(body: AboutDTO) {
        const { description_arm, description_eng, image } = body;
        const about = await this.aboutModel.findOne();
        if (about) {
            about.description_arm = description_arm;
            about.description_eng = description_eng;
            about.image = image;

            await about.save();

            return Success(true, "About us updated successfully", about);
        } else {
            const about = await this.aboutModel.create({
                description_arm,
                description_eng,
            });

            return Success(true, "About us updated successfully", about);
        }
    }
}
