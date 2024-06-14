import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, now } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

export type ConnectionDocument = Connection & Document;

@Schema({ timestamps: true })
export class Connection extends Document {
    @Prop({ required: false, default: "" })
    user_connection_id: string;

    @Prop({ required: false, type: Types.ObjectId })
    admin_id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    subject: string;

    @Prop({ required: false, default: false })
    is_ended: boolean;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;

    @Prop({ required: true, default: 0 })
    timezone: number;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
ConnectionSchema.plugin(mongoosePagination);
