import { Injectable } from "@nestjs/common";
import { Pagination, PaginationModel } from "mongoose-paginate-ts";
import { InjectModel } from "@nestjs/mongoose";
import { Message, MessageDocument } from "./messages.model";
import { Connection, ConnectionDocument } from "./connection.model";
import { Model, Types } from "mongoose";
import { ConnectionCreateDTO } from "./dto/connection.dto";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";
import { lookup } from "mime-types";

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name) private readonly messagePaginateModel: Pagination<MessageDocument>,
        @InjectModel(Connection.name) private readonly connectionPaginateModel: Pagination<ConnectionDocument>,
        @InjectModel(Connection.name) private readonly connectionModel: Model<ConnectionDocument>,
        private readonly jwtService: JwtService
    ) {}

    // async searchConnections(page: number, term: string, orderType: string): Promise<PaginationModel<Connection>> {
    //     return await this.connectionPaginateModel.paginate({
    //         page,
    //         limit: 20,
    //         query: {
    //             is_ended: true,
    //             $or: [
    //                 {
    //                     email: {
    //                         $regex: term,
    //                         $options: "i",
    //                     },
    //                 },
    //                 {
    //                     name: {
    //                         $regex: term,
    //                         $options: "i",
    //                     },
    //                 },
    //                 {
    //                     subject: {
    //                         $regex: term,
    //                         $options: "i",
    //                     },
    //                 },
    //             ],
    //         },
    //         sort: {
    //             createdAt: orderType === "desc" ? -1 : 1,
    //         },
    //         select: {
    //             _id: 1,
    //             name: 1,
    //             email: 1,
    //             subject: 1,
    //             createdAt: 1,
    //         },
    //     });
    // }

    // async findNewConnections(page: number): Promise<PaginationModel<Connection>> {
    //     return await this.connectionPaginateModel.paginate({
    //         page,
    //         limit: 20,
    //         query: {
    //             is_ended: false,
    //         },
    //         sort: {
    //             createdAt: -1,
    //         },
    //         select: {
    //             _id: 1,
    //             name: 1,
    //             email: 1,
    //             subject: 1,
    //             createdAt: 1,
    //         },
    //     });
    // }

    // async findMessagsByConnectionId(id: string, page: number): Promise<PaginationModel<Message>> {
    //     try {
    //         let data = await this.messagePaginateModel.paginate({
    //             page,
    //             limit: 20,
    //             query: {
    //                 connection_id: new Types.ObjectId(id),
    //             },
    //             sort: {
    //                 createdAt: -1,
    //             },
    //             select: {
    //                 _id: 1,
    //                 is_admin: 1,
    //                 message: 1,
    //                 is_attachment: 1,
    //                 createdAt: 1,
    //             },
    //         });

    //         data.docs = data.docs.reverse();

    //         return data;
    //     } catch (e) {}

    //     return new PaginationModel<Message>();
    // }

    // async createConnection(body: ConnectionCreateDTO): Promise<Success> {
    //     let connection = await this.connectionModel.findOne({
    //         email: body.email,
    //         is_ended: false,
    //     });

    //     if (!connection) {
    //         const createdConnection = new this.connectionModel(body);
    //         connection = await createdConnection.save();

    //         await this.notificationsService.addNotification({
    //             message: `New live chat from ${connection.name}, email ${connection.email}, subject ${connection.subject}`,
    //             dataType: "live_chat",
    //         });
    //     }

    //     return success({
    //         is_exists: !!connection,
    //         token: this.jwtService.sign(
    //             { sub: connection._id, role: RoleMessageUser },
    //             {
    //                 expiresIn: "7200s",
    //             }
    //         ),
    //     });
    // }

    // async endConnection(id: string): Promise<Success> {
    //     try {
    //         let connection = await this.connectionModel.findById(id);

    //         connection.is_ended = true;

    //         await connection.save();

    //         let chat = await this.messagePaginateModel.find({
    //             connection_id: connection._id,
    //         });

    //         await chatHistory(connection.email, connection.createdAt, connection.timezone, chat);

    //         return success();
    //     } catch (e) {}

    //     return success(null, false);
    // }

    // async addAttachment(name: string): Promise<Success> {
    //     const uniqueId: string = uuidv4() + "_" + name;

    //     let mimeType = lookup(uniqueId);

    //     if (mimeType !== false) {
    //         let url = await putObjectURL(uniqueId, mimeType);

    //         return success({
    //             name: uniqueId,
    //             url,
    //         });
    //     }

    //     return success(null, false);
    // }

    // async deleteConnection(id: string): Promise<Success> {
    //     try {
    //         let objectID = new Types.ObjectId(id);

    //         await this.messagePaginateModel.deleteMany({
    //             connection_id: objectID,
    //         });

    //         let is = await this.connectionModel.deleteOne({
    //             _id: objectID,
    //         });

    //         return success(null, is.deletedCount === 1);
    //     } catch (e) {}

    //     return success(null, false);
    // }
}
