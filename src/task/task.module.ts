import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksController } from "./task.controller";
import { TasksService } from "./task.service";
import { TaskModel, taskModelSchema } from "./task.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: TaskModel.name, schema: taskModelSchema }])],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
