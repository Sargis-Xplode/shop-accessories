import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesController } from "./categories.controller";
import { CategoriesModel, categoriesSchema } from "./categories.model";
import { CategoriesService } from "./categories.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: CategoriesModel.name, schema: categoriesSchema }])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {}
