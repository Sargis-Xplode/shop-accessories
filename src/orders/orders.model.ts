import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";
import { CartItemDTO } from "types/cardItem.interface";
import { OrderUserInfo } from "types/orderUserInfo.inferface";

@Schema({ collection: "orders", timestamps: true })
export class OrdersModel extends Document {
    @Prop()
    title: string;

    @Prop({ type: [{ type: Object }] })
    products: CartItemDTO[];

    @Prop({ type: Object })
    user_info: OrderUserInfo;

    @Prop()
    status: number;
}

export const ordersSchema = SchemaFactory.createForClass(OrdersModel);

ordersSchema.plugin(mongoosePagination);
