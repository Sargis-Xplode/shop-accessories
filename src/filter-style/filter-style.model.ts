import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "styles" })
export class FilterStyleModel extends Document {
    @Prop()
    name_arm: string;

    @Prop()
    name_eng: string;

    @Prop()
    active: boolean;
}

export const filterStyleModelSchema = SchemaFactory.createForClass(FilterStyleModel);
