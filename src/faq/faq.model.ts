import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

@Schema({ collection: "faq", timestamps: true })
export class FAQModel extends Document {
    @Prop()
    question_arm: string;

    @Prop()
    question_eng: string;

    @Prop()
    answer_arm: string;

    @Prop()
    answer_eng: string;

    @Prop()
    tab_id: Types.ObjectId;
}

export const faqModelSchema = SchemaFactory.createForClass(FAQModel);

faqModelSchema.plugin(mongoosePagination);
