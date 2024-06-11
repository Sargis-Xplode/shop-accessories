import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from "./task/task.module";
import { AuthModule } from "./auth/auth.module";

require("dotenv").config();

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGODB_URI), AuthModule, TasksModule],
})
export class AppModule {}
