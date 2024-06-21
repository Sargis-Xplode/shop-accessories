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

    @Prop({ type: Types.ObjectId, ref: "Collections", required: false })
    collection_id: Types.ObjectId;

    @Prop({ type: Object })
    extra_info: ExtraInfo;

    @Prop({
        type: {
            category_id: { type: Types.ObjectId, ref: "CategoriesModel" },
            subcategories: [{ type: Types.ObjectId, ref: "SubCategoryModel" }],
        },
    })
    filter_categories: FilterCategory;

    @Prop({ type: [{ type: Types.ObjectId, ref: "FilterMaterialModel" }] })
    filter_materials: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: "FilterStyleModel" })
    filter_styles: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: "FilterOccasionModel" }] })
    filter_occasions: Types.ObjectId[];

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
