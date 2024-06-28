import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { ProductModel, productModelSchema } from "src/product/product.model";
import { OrdersModel, ordersSchema } from "src/orders/orders.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ProductModel.name, schema: productModelSchema }]),
        MongooseModule.forFeature([{ name: OrdersModel.name, schema: ordersSchema }]),
    ],
    controllers: [PaymentsController],
    providers: [PaymentsService],
})
export class PaymentsModule {}
