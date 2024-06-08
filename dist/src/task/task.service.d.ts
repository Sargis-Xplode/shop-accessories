/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/aggregate" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/callback" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/collection" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/connection" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/cursor" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/document" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/error" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/expressions" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/helpers" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/middlewares" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/indexes" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/models" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/mongooseoptions" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/pipelinestage" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/populate" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/query" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/schemaoptions" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/schematypes" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/session" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/types" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/utility" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/validation" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/virtuals" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
/// <reference types="mongoose-paginate-ts/node_modules/mongoose/types/inferschematype" />
import Task from "../../types/Task";
import { TaskDocument, TaskModel } from "./task.model";
import { PaginationModel } from "mongoose-paginate-ts";
export declare class TasksService {
    private readonly taskModel;
    private readonly tasks;
    create(task: Task): Promise<{
        success: boolean;
        data: {
            task: Task;
        };
    }>;
    findAll(page: number): Promise<PaginationModel<TaskDocument>>;
    update(id: string, body: any): Promise<{
        success: boolean;
        data: any;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, TaskDocument> & TaskModel & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
}
