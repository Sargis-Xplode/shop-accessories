import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Pagination, PaginationModel } from "mongoose-paginate-ts";
import SuccessResponse from "types/success.interface";
import Success from "utils/success-response";
import { contactUSEmail } from "src/emails/aws-ses";
import { OrdersModel } from "./orders.model";

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(OrdersModel.name)
        private readonly ordersModel: Pagination<OrdersModel>
    ) {}

    async delete(id: string): Promise<SuccessResponse> {
        await this.ordersModel.findByIdAndDelete(id).exec();
        return Success(true, "Successfully deleted", null);
    }
}
