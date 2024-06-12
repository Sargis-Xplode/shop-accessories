import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "privacy" })
export class Privacy extends Document {
    @Prop()
    description_arm: string;

    @Prop()
    description_eng: string;
}

export const PrivacySchema = SchemaFactory.createForClass(Privacy);
