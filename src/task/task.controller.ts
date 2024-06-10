import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TasksService } from "./task.service";
import { CreateTaskDTO } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    async findAll(@Query("page") page: string) {
        return this.taskService.findAll(parseInt(page));
    }

    @Post("")
    async creat(@Body() createTaskDto: CreateTaskDTO) {
        return this.taskService.create(createTaskDto);
    }

    @Put(":id")
    async update(@Body() updatedTask: CreateTaskDTO, @Param("id") id: string) {
        return this.taskService.update(id, updatedTask);
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.taskService.delete(id);
    }
}
