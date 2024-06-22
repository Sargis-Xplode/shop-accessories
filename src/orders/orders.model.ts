import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

@Schema()
export class OrdersModel extends Document {
    @Prop()
    name: string;

    @Prop()
    status: string;

    @Prop({ default: now() })
    createdAt: Date;
}

export const ordersSchema = SchemaFactory.createForClass(OrdersModel);

ordersSchema.plugin(mongoosePagination);
