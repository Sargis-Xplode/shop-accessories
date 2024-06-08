import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from "./task/task.module";

require("dotenv").config();

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGODB_URI), TasksModule],
})
export class AppModule {}
