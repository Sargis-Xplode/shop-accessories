import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "contact-us-info" })
export class ContactUsInfo extends Document {
    @Prop()
    description_arm: string;

    @Prop()
    description_eng: string;
}

export const ContactUsInfoSchema = SchemaFactory.createForClass(ContactUsInfo);
