import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import SuccessResponse from "types/success.interface";
import { CategoriesDTO } from "./dto/categories.dto";
import { CategoriesModel } from "./categories.model";
import { Success } from "utils/success-response";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(CategoriesModel.name)
        private readonly categoriesModel: Model<CategoriesModel>
    ) {}

    async getCategories(): Promise<SuccessResponse> {
        try {
            const categories = await this.categoriesModel.find();
            return Success(true, "Success", categories);
        } catch (err) {
            return Success(false, err, null);
        }
    }

    async createCategories(body: CategoriesDTO): Promise<SuccessResponse> {
        const { category_arm, category_eng, subCategories } = body;
        try {
            const categories = await this.categoriesModel.create({
                category_arm,
                category_eng,
                subCategories,
                active: true,
            });
            return Success(true, "Success", categories);
        } catch (err) {
            return Success(false, err, null);
        }
    }

    async toggleActive(id: string, active: boolean): Promise<SuccessResponse> {
        try {
            const categories = await this.categoriesModel.findById(id);
            if (categories) {
                categories.active = active;
                await categories.save();

                // This condition doestn work, change later
                if (active) {
                    console.log("here", active);
                    return Success(true, "Activated successfully", categories);
                } else {
                    console.log("here 2", active);

                    return Success(true, "Deactivated successfully", categories);
                }
            } else {
                return Success(false, "There was an error", null);
            }
        } catch (err) {
            return Success(false, err, null);
        }
    }

    async updateCategories(id: string, body: CategoriesDTO): Promise<SuccessResponse> {
        const { category_arm, category_eng, subCategories } = body;

        const categories = await this.categoriesModel.findById(id);
        if (categories) {
            categories.category_arm = category_arm;
            categories.category_eng = category_eng;
            categories.subCategories = subCategories;

            await categories.save();

            return Success(true, "Categories updated successfully", categories);
        } else {
            return Success(false, "Categories wasn't updated", null);
        }
    }

    async deleteCategories(id: string): Promise<SuccessResponse> {
        try {
            await this.categoriesModel.findByIdAndDelete(id);
            return Success(true, "Category was deleted successfully", null);
        } catch (err) {
            return Success(false, "There was an error", null);
        }
    }
}
