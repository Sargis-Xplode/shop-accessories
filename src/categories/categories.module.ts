import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesController } from "./categories.controller";
import { CategoriesModel, categoriesSchema } from "./categories.model";
import { CategoriesService } from "./categories.service";
import { FiltersController } from "./filters.controller";
import { FilterMaterialModel, filterMaterialModelSchema } from "src/filter-material/filter-material.model";
import { FilterStyleModel, filterStyleModelSchema } from "src/filter-style/filter-style.model";
import { FilterOccasionModel, filterOccasionModelSchema } from "src/filter-occasion/filter-occasion.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CategoriesModel.name, schema: categoriesSchema }]),
        MongooseModule.forFeature([{ name: FilterMaterialModel.name, schema: filterMaterialModelSchema }]),
        MongooseModule.forFeature([{ name: FilterStyleModel.name, schema: filterStyleModelSchema }]),
        MongooseModule.forFeature([{ name: FilterOccasionModel.name, schema: filterOccasionModelSchema }]),
    ],
    controllers: [CategoriesController, FiltersController],
    providers: [CategoriesService],
})
export class CategoriesModule {}
