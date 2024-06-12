import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

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

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export const faqModelSchema = SchemaFactory.createForClass(FAQModel);

faqModelSchema.plugin(mongoosePagination);
