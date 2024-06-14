import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import SuccessResponse from "types/success.interface";
import Success from "../../utils/success-response";
import { FilterMaterialModel } from "./filter-material.model";
import { Model } from "mongoose";
import { FilterMaterialDTO } from "./dto/filter-material.dto";

@Injectable()
export class FilterMaterialService {
    constructor(
        @InjectModel(FilterMaterialModel.name)
        private readonly filterMaterialModel: Model<FilterMaterialModel>
    ) {}

    async getFilterMaterial(): Promise<SuccessResponse> {
        const filterMaterial = await this.filterMaterialModel.find();
        if (filterMaterial) {
            return Success(true, "Successful", filterMaterial);
        } else {
            return Success(false, "Unsuccessful", null);
        }
    }

    async createFilterMaterial(body: FilterMaterialDTO) {
        const { name_arm, name_eng } = body;

        const filterMaterial = await this.filterMaterialModel.create({
            name_arm,
            name_eng,
            active: true,
        });

        if (filterMaterial) {
            return Success(true, "Successfully created", filterMaterial);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async updateFilterMaterial(id: string, body: FilterMaterialDTO) {
        const { name_arm, name_eng } = body;

        const filterMaterial = await this.filterMaterialModel.findById(id);
        if (filterMaterial) {
            filterMaterial.name_arm = name_arm;
            filterMaterial.name_eng = name_eng;

            await filterMaterial.save();
            return Success(true, "Successfully updated", filterMaterial);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async toggleActive(id: string, active: string): Promise<SuccessResponse> {
        try {
            const filterMaterial = await this.filterMaterialModel.findById(id);
            if (filterMaterial) {
                filterMaterial.active = active === "true";
                await filterMaterial.save();

                if (active === "true") {
                    console.log("here", active);
                    return Success(true, "Activated successfully", filterMaterial);
                } else {
                    console.log("here 2", active);

                    return Success(true, "Deactivated successfully", filterMaterial);
                }
            } else {
                return Success(false, "There was an error", null);
            }
        } catch (err) {
            return Success(false, err, null);
        }
    }

    async deleteFilterMaterial(id: string): Promise<SuccessResponse> {
        try {
            await this.filterMaterialModel.findByIdAndDelete(id);
            return Success(true, "Successfully deleted", null);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }
}
