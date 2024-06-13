import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FilterOccasionController } from "./filter-occasion.controller";
import { FilterOccasionModel, filterOccasionModelSchema } from "./filter-occasion.model";
import { FilterOccasionService } from "./filter-occasion.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: FilterOccasionModel.name, schema: filterOccasionModelSchema }])],
    controllers: [FilterOccasionController],
    providers: [FilterOccasionService],
})
export class FilterOccasionModule {}
