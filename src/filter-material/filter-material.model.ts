import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from "mongoose";

@Schema({ collection: "materials" })
export class FilterMaterialModel extends Document {
    @Prop()
    name_arm: string;

    @Prop()
    name_eng: string;

    @Prop()
    active: boolean;
}

export const filterMaterialModelSchema = SchemaFactory.createForClass(FilterMaterialModel);
