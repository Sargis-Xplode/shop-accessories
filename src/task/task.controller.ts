import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./task.service";
import { CreateTaskDTO } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    async findAll() {
        return this.taskService.findAll();
    }

    @Post("create")
    async creat(@Body() createTaskDto: CreateTaskDTO) {
        return this.taskService.create(createTaskDto);
    }

    @Put(":id/update")
    async update(@Body() updatedTask: CreateTaskDTO, @Param("id") id: string) {
        return this.taskService.update(id, updatedTask);
    }

    @Delete(":id/delete")
    async delete(@Param("id") id: string) {
        return this.taskService.delete(id);
    }
}
