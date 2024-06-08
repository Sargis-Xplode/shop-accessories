import { Injectable } from "@nestjs/common";
import Task from "../../types/Task";
import { TaskDocument, TaskModel } from "./task.model";
import { InjectModel } from "@nestjs/mongoose";
import { Pagination, PaginationModel } from "mongoose-paginate-ts";

@Injectable()
export class TasksService {
    @InjectModel(TaskModel.name) private readonly taskModel: Pagination<TaskDocument>;
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

    async findAll(page: number): Promise<PaginationModel<TaskDocument>> {
        return this.taskModel.paginate({
            limit: 5,
            page,
            sort: {
                createdAt: -1,
            },
        });
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
