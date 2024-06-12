import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "faq" })
export class FAQModel extends Document {
    @Prop()
    question_arm: string;

    @Prop()
    question_eng: string;

    @Prop()
    answer_arm: string;

    @Prop()
    answer_eng: string;
}

export const faqModelSchema = SchemaFactory.createForClass(FAQModel);
