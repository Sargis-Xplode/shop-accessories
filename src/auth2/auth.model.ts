// admin.model.ts
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "admins" })
export class AdminsModel extends Document {
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;
}

export const adminsModelSchema = SchemaFactory.createForClass(AdminsModel);
