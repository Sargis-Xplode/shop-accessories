import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, now, Types } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";
import ColorsAndImages from "types/colorsAndImages.interface";
import ExtraInfo from "../../types/extraInfo.interface";

export interface FilterCategory {
    category_id: string;
    subcategories: Types.ObjectId[];
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
    in_stock: number;

    @Prop()
    collection_id: string;

    @Prop({ type: Object })
    extra_info: ExtraInfo;

    @Prop({ type: Object })
    filter_categories: FilterCategory;

    @Prop()
    filter_materials: string[];

    @Prop({ type: Types.ObjectId })
    filter_styles: Types.ObjectId;

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

    @Prop({ default: null })
    deletedAt: Date;
}

export const productModelSchema = SchemaFactory.createForClass(ProductModel);

productModelSchema.plugin(mongoosePagination);
