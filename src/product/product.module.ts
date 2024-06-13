import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductModel, productModelSchema } from "./product.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: ProductModel.name, schema: productModelSchema }])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
