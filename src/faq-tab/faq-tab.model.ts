import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

@Schema({ collection: "faq-tab" })
export class FAQTabModel extends Document {
    @Prop()
    name_arm: string;

    @Prop()
    name_eng: string;
}

export const faqTabModelSchema = SchemaFactory.createForClass(FAQTabModel);

faqTabModelSchema.plugin(mongoosePagination);
