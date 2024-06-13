import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "occasions" })
export class FilterOccasionModel extends Document {
    @Prop()
    name_arm: string;

    @Prop()
    name_eng: string;

    @Prop()
    active: boolean;
}

export const filterOccasionModelSchema = SchemaFactory.createForClass(FilterOccasionModel);
