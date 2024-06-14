import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

@Schema()
export class ContactModel extends Document {
    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    email: string;

    @Prop()
    phone_number: string;

    @Prop()
    subject: string;

    @Prop()
    message: string;

    @Prop({ default: now() })
    createdAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(ContactModel);

ContactSchema.plugin(mongoosePagination);
