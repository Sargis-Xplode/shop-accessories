import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import SuccessResponse from "types/success.interface";
import Success from "../../utils/success-response";
import { FilterStyleModel } from "./filter-style.model";
import { Model } from "mongoose";
import { FilterStyleDTO } from "./dto/filter-style.dto";

@Injectable()
export class FilterStyleService {
    constructor(
        @InjectModel(FilterStyleModel.name)
        private readonly filterStyleModel: Model<FilterStyleModel>
    ) {}

    async getFilterStyle(): Promise<SuccessResponse> {
        const filterStyle = await this.filterStyleModel.find();
        if (filterStyle) {
            return Success(true, "Successful", filterStyle);
        } else {
            return Success(false, "Unsuccessful", null);
        }
    }

    async createFilterStyle(body: FilterStyleDTO) {
        const { name_arm, name_eng } = body;

        const filterStyle = await this.filterStyleModel.create({
            name_arm,
            name_eng,
            active: true,
        });

        if (filterStyle) {
            return Success(true, "Successfully created", filterStyle);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async updateFilterStyle(id: string, body: FilterStyleDTO) {
        const { name_arm, name_eng } = body;

        const filterStyle = await this.filterStyleModel.findById(id);
        if (filterStyle) {
            filterStyle.name_arm = name_arm;
            filterStyle.name_eng = name_eng;

            await filterStyle.save();
            return Success(true, "Successfully updated", filterStyle);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async toggleActive(id: string, active: string): Promise<SuccessResponse> {
        try {
            const filterStyle = await this.filterStyleModel.findById(id);
            if (filterStyle) {
                filterStyle.active = active === "true";
                await filterStyle.save();

                if (active === "true") {
                    return Success(true, "Activated successfully", filterStyle);
                } else {
                    return Success(true, "Deactivated successfully", filterStyle);
                }
            } else {
                return Success(false, "There was an error", null);
            }
        } catch (err) {
            return Success(false, err, null);
        }
    }

    async deleteFilterStyle(id: string): Promise<SuccessResponse> {
        try {
            await this.filterStyleModel.findByIdAndDelete(id);
            return Success(true, "Successfully deleted", null);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }
}
