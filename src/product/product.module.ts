import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductModel, productModelSchema } from "./product.model";
import { ProductSearchontroller } from "./product-search.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: ProductModel.name, schema: productModelSchema }])],
    controllers: [ProductController, ProductSearchontroller],
    providers: [ProductService],
})
export class ProductModule {}
