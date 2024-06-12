import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "terms" })
export class Terms extends Document {
    @Prop()
    description_arm: string;

    @Prop()
    description_eng: string;
}

export const TermsSchema = SchemaFactory.createForClass(Terms);
