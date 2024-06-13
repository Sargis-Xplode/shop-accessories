import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";
import ColorsAndImages from "types/colorsAndImages.interface";
import ExtraInfo from "../../types/extraInfo.interface";

export interface FilterCategory {
    category_id: string;
    subcategories: string[];
}

@Schema({ collection: "products" })
export class ProductModel extends Document {
    @Prop()
    name_arm: string;

    @Prop()
    name_eng: string;

    @Prop()
    description_arm: string;

    @Prop()
    description_eng: string;

    @Prop()
    price: number;

    @Prop()
    sale: number;

    @Prop()
    available: number;

    @Prop()
    collection_id: string;

    @Prop({ type: Object })
    extra_info: ExtraInfo;

    @Prop({ type: Object })
    filter_categories: FilterCategory;

    @Prop()
    filter_materials: string[];

    @Prop()
    filter_styles: string[];

    @Prop()
    filter_occasions: string[];

    @Prop()
    colors_and_images: ColorsAndImages[];

    @Prop()
    active: boolean;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export const productModelSchema = SchemaFactory.createForClass(ProductModel);

productModelSchema.plugin(mongoosePagination);
