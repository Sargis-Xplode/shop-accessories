import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageController } from "./messages.controller";
import { MessageService } from "./messages.service";
import { Message, MessageSchema } from "./messages.model";
import { Connection, ConnectionSchema } from "./connection.model";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
            { name: Connection.name, schema: ConnectionSchema },
        ]),
    ],
    controllers: [MessageController],
    providers: [MessageService],
})
export class MessageModule {}
