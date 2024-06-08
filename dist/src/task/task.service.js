"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_model_1 = require("./task.model");
const mongoose_1 = require("@nestjs/mongoose");
let TasksService = class TasksService {
    async create(task) {
        this.taskModel.create(task);
        return {
            success: true,
            data: {
                task,
            },
        };
    }
    async findAll(page) {
        return this.taskModel.paginate({
            limit: 5,
            page,
            sort: {
                createdAt: -1,
            },
        });
    }
    async update(id, body) {
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
    async delete(id) {
        return await this.taskModel.findByIdAndDelete(id).exec();
    }
};
exports.TasksService = TasksService;
__decorate([
    (0, mongoose_1.InjectModel)(task_model_1.TaskModel.name),
    __metadata("design:type", Object)
], TasksService.prototype, "taskModel", void 0);
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=task.service.js.map