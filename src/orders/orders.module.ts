import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrdersModel, ordersSchema } from "./orders.model";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: OrdersModel.name, schema: ordersSchema }])],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
