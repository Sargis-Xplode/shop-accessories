import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, now } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message extends Document {
    @Prop({ required: true, type: Types.ObjectId })
    connection_id: Types.ObjectId;

    @Prop({ required: true })
    is_admin: boolean;

    @Prop({ default: false })
    is_attachment: boolean;

    @Prop({ required: true })
    message: string;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.plugin(mongoosePagination);
