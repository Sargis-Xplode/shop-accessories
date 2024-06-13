import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FilterMaterialController } from "./filter-material.controller";
import { FilterMaterialModel, filterMaterialModelSchema } from "./filter-material.model";
import { FilterMaterialService } from "./filter-material.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: FilterMaterialModel.name, schema: filterMaterialModelSchema }])],
    controllers: [FilterMaterialController],
    providers: [FilterMaterialService],
})
export class FilterMaterialModule {}
