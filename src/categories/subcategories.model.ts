import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "subcategories" })
export class SubCategoryModel extends Document {
    @Prop()
    subcategory_arm: string;

    @Prop()
    subcategory_eng: string;
}

export const subCategorySchema = SchemaFactory.createForClass(SubCategoryModel);
