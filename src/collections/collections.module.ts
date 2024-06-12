import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CollectionsController } from "./collections.controller";
import { CollectionsService } from "./collections.service";
import { Collections, collectionsSchema } from "./collections.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: Collections.name, schema: collectionsSchema }])],
    controllers: [CollectionsController],
    providers: [CollectionsService],
})
export class CollectionsModule {}
