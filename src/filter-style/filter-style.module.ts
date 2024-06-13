import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FilterStyleController } from "./filter-style.controller";
import { FilterStyleModel, filterStyleModelSchema } from "./filter-style.model";
import { FilterStyleService } from "./filter-style.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: FilterStyleModel.name, schema: filterStyleModelSchema }])],
    controllers: [FilterStyleController],
    providers: [FilterStyleService],
})
export class FilterStyleModule {}
