import { Injectable } from "@nestjs/common";
import Task from "../../types/Task";
import { Model } from "mongoose";
import { TaskDocument, TaskModel } from "./task.model";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TasksService {
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskDocument>;
    private readonly tasks: Task[];

    async create(task: Task) {
        this.taskModel.create(task);

        return {
            success: true,
            data: {
                task,
            },
        };
    }

    async findAll(): Promise<TaskDocument[]> {
        return this.taskModel.find().exec();
    }

    async update(id: string, body: any) {
        const data = await this.taskModel.findById(id).exec();
        const { name, task, done } = body;
        data.name = name;
        data.task = task;
        data.done = done;

        await data.save();

        return {
            success: true,
            data: null,
        };
    }

    async delete(id: string) {
        return await this.taskModel.findByIdAndDelete(id).exec();
    }
}
