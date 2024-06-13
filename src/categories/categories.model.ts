import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import SubCategories from "subcategories";

@Schema({ collection: "categories" })
export class CategoriesModel extends Document {
    @Prop()
    category_arm: string;

    @Prop()
    category_eng: string;

    @Prop()
    subCategories: SubCategories[];

    @Prop()
    active: boolean;
}

export const categoriesSchema = SchemaFactory.createForClass(CategoriesModel);
