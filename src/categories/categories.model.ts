import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import SubCategories from "types/armAndEng.interface";

@Schema({ collection: "categories" })
export class CategoriesModel extends Document {
    @Prop()
    category_arm: string;

    @Prop()
    category_eng: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: "SubCategoryModel" }] })
    subCategories: Types.ObjectId[];

    @Prop()
    active: boolean;
}

export const categoriesSchema = SchemaFactory.createForClass(CategoriesModel);
