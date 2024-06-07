import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from "mongoose";

export type TaskDocument = TaskModel & Document;

@Schema({ collection: "tasks" })
export class TaskModel extends Document {
    @Prop()
    name: string;

    @Prop()
    task: string;

    @Prop()
    done: boolean;

    @Prop({ default: now() })
    createdAt: Date;
}

export const taskModelSchema = SchemaFactory.createForClass(TaskModel);
