import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import SuccessResponse from "types/success.interface";
import { CategoriesDTO } from "./dto/categories.dto";
import { CategoriesModel } from "./categories.model";
import Success from "../../utils/success-response";
import { FilterMaterialModel } from "src/filter-material/filter-material.model";
import { FilterStyleModel } from "src/filter-style/filter-style.model";
import { FilterOccasionModel } from "src/filter-occasion/filter-occasion.model";
import { SubCategoriesDTO } from "./dto/subcategories.dto";
import { SubCategoryModel } from "./subcategories.model";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(FilterMaterialModel.name)
        private readonly filterMaterialModel: Model<FilterMaterialModel>,

        @InjectModel(FilterStyleModel.name)
        private readonly filterStyleModel: Model<FilterStyleModel>,

        @InjectModel(FilterOccasionModel.name)
        private readonly filterOccasionModel: Model<FilterOccasionModel>,

        @InjectModel(CategoriesModel.name)
        private readonly categoriesModel: Model<CategoriesModel>,

        @InjectModel(SubCategoryModel.name)
        private subCategoryModel: Model<SubCategoryModel>
    ) {}

    async getCategories(): Promise<SuccessResponse> {
        try {
            const categories = await this.categoriesModel.find().populate({
                path: "subCategories",
                model: "SubCategoryModel",
            });
            return Success(true, "Success", categories);
        } catch (err) {
            return Success(false, err, null);
        }
    }

    async getFilters(active: string): Promise<SuccessResponse> {
        try {
            let filter = {};

            if (active === "true") {
                filter["active"] = true;
            }

            const data = await Promise.all([
                this.filterMaterialModel.find(filter), // TO DO lang query
                this.filterStyleModel.find(filter),
                this.filterOccasionModel.find(filter),
                this.categoriesModel.find(filter).populate({
                    path: "subCategories",
                    model: "SubCategoryModel",
                }),
            ]).then((values) => {
                return values;
            });

            const [materials, styles, occasions, categories] = data;

            // if (active === "true") {
            //     categories = categories.filter((item) => item.active); // TO DO
            //     materials = materials.filter((item) => item.active);
            //     styles = styles.filter((item) => item.active);
            //     occasions = occasions.filter((item) => item.active);
            // }

            if (data.length) {
                return Success(true, "Successful", {
                    categories,
                    materials,
                    styles,
                    occasions,
                });
            }
        } catch (err) {
            return Success(false, err.message, null);
        }
    }

    async createCategories(body: CategoriesDTO): Promise<SuccessResponse> {
        const { category_arm, category_eng, subCategories } = body;

        const subcategory_ids = subCategories.length ? await this.mapSubcategories(subCategories) : [];

        try {
            const categories = await this.categoriesModel.create({
                name_arm: category_arm,
                name_eng: category_eng,
                subCategories: subcategory_ids,
                active: true,
            });
            return Success(true, "Success", categories);
        } catch (err) {
            return Success(false, err, null);
        }
    }

    async toggleActive(id: string, active: string): Promise<SuccessResponse> {
        try {
            const categories = await this.categoriesModel.findById(id);
            if (categories) {
                categories.active = active === "true";
                await categories.save();

                if (active === "true") {
                    return Success(true, "Activated successfully", categories);
                } else {
                    return Success(true, "Deactivated successfully", categories);
                }
            } else {
                return Success(false, "There was an error", null);
            }
        } catch (err) {
            return Success(false, err, null);
        }
    }

    async mapSubcategories(subCategories: SubCategoriesDTO[]) {
        const subcategory_ids = (await this.subCategoryModel.insertMany(subCategories)).map((item) => {
            return item._id;
        });
        return subcategory_ids;
    }

    async updateCategories(id: string, body: CategoriesDTO): Promise<SuccessResponse> {
        const { category_arm, category_eng, subCategories } = body;
        const subcategory_ids: any = subCategories.length ? await this.mapSubcategories(subCategories) : [];

        const categories = await this.categoriesModel.findById(id);
        if (categories) {
            categories.name_arm = category_arm;
            categories.name_eng = category_eng;
            categories.subCategories = subcategory_ids;

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
