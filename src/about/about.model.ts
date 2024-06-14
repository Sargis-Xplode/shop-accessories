import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "about" })
export class About extends Document {
    @Prop()
    description_arm: string;

    @Prop()
    description_eng: string;

    @Prop()
    image: string;
}

export const AboutSchema = SchemaFactory.createForClass(About);
