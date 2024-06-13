import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Collections } from "./collections.model";
import { CollectionsDTO } from "./dto/collections.dto";
import SuccessResponse from "types/success.interface";
import { Pagination } from "mongoose-paginate-ts";
import Success from "utils/success-response";

@Injectable()
export class CollectionsService {
    constructor(
        @InjectModel(Collections.name)
        private readonly collectionsModel: Pagination<Collections>
    ) {}

    async getCollections(page: number, limit: number): Promise<SuccessResponse> {
        try {
            const data = await this.collectionsModel.paginate({
                limit,
                page,
                sort: {
                    createdAt: -1,
                },
            });

            return Success(true, "Successful", data);
        } catch (err) {
            return Success(false, "Unsuccessful", null);
        }
    }

    async createCollection(body: CollectionsDTO) {
        const { name_arm, name_eng, image } = body;
        try {
            const collections = await this.collectionsModel.create({
                name_arm,
                name_eng,
                image,
            });

            return Success(true, "Collection was created successfully", collections);
        } catch (err) {
            return Success(false, "Unsuccessful", null);
        }
    }

    async updateCollection(id: string, body: CollectionsDTO) {
        const { name_arm, name_eng, image } = body;
        const collections = await this.collectionsModel.findById(id);
        if (collections) {
            collections.name_arm = name_arm;
            collections.name_eng = name_eng;
            collections.image = image;

            await collections.save();

            return Success(true, "Collection was updated successfully", collections);
        } else {
            return Success(false, "Collection wasn't updated", null);
        }
    }

    async deleteCollection(id: string) {
        try {
            await this.collectionsModel.findByIdAndDelete(id);
            return Success(true, "Collection was deleted successfully", null);
        } catch (err) {
            return Success(false, "There was an error", null);
        }
    }
}
