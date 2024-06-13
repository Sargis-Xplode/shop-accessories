import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import SuccessResponse from "types/success.interface";
import Success from "../../utils/success-response";
import { FilterOccasionModel } from "./filter-occasion.model";
import { Model } from "mongoose";
import { FilterOccasionDTO } from "./dto/filter-occasion.dto";

@Injectable()
export class FilterOccasionService {
    constructor(
        @InjectModel(FilterOccasionModel.name)
        private readonly filterOccasionModel: Model<FilterOccasionModel>
    ) {}

    async getFilterOccasion(): Promise<SuccessResponse> {
        const filterOccasion = await this.filterOccasionModel.find();
        if (filterOccasion) {
            return Success(true, "Successful", filterOccasion);
        } else {
            return Success(false, "Unsuccessful", null);
        }
    }

    async createFilterOccasion(body: FilterOccasionDTO) {
        const { name_arm, name_eng } = body;

        const filterOccasion = await this.filterOccasionModel.create({
            name_arm,
            name_eng,
            active: true,
        });

        if (filterOccasion) {
            return Success(true, "Successfully created", filterOccasion);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async updateFilterOccasion(id: string, body: FilterOccasionDTO) {
        const { name_arm, name_eng } = body;

        const filterOccasion = await this.filterOccasionModel.findById(id);
        if (filterOccasion) {
            filterOccasion.name_arm = name_arm;
            filterOccasion.name_eng = name_eng;

            await filterOccasion.save();
            return Success(true, "Successfully updated", filterOccasion);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async toggleActive(id: string, active: boolean): Promise<SuccessResponse> {
        try {
            const filterOccasion = await this.filterOccasionModel.findById(id);
            if (filterOccasion) {
                filterOccasion.active = active;
                await filterOccasion.save();

                // This condition doestn work, change later
                if (active) {
                    console.log("here", active);
                    return Success(true, "Activated successfully", filterOccasion);
                } else {
                    console.log("here 2", active);

                    return Success(true, "Deactivated successfully", filterOccasion);
                }
            } else {
                return Success(false, "There was an error", null);
            }
        } catch (err) {
            return Success(false, err, null);
        }
    }

    async deleteFilterOccasion(id: string): Promise<SuccessResponse> {
        try {
            await this.filterOccasionModel.findByIdAndDelete(id);
            return Success(true, "Successfully deleted", null);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }
}
