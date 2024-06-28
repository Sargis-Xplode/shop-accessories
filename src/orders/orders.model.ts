import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

@Schema({ collection: "orders", timestamps: true })
export class OrdersModel extends Document {
    @Prop()
    title: string;

    @Prop()
    names: string[];

    @Prop()
    status: number;

    @Prop()
    product_ids: Types.ObjectId[];

    @Prop()
    prices: number[];

    @Prop()
    sales: number[];

    @Prop()
    quantities: number[];
}

export const ordersSchema = SchemaFactory.createForClass(OrdersModel);

ordersSchema.plugin(mongoosePagination);
