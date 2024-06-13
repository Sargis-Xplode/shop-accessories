import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

@Schema({ collection: "collections" })
export class Collections extends Document {
    @Prop()
    name_arm: string;

    @Prop()
    name_eng: string;

    @Prop()
    image: string;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export const collectionsSchema = SchemaFactory.createForClass(Collections);

collectionsSchema.plugin(mongoosePagination);
