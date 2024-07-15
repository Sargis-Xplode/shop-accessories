import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Pagination } from "mongoose-paginate-ts";
import SuccessResponse from "types/success.interface";
import Success from "utils/success-response";
import { ProductModel } from "src/product/product.model";
import { OrdersModel } from "src/orders/orders.model";

@Injectable()
export class PaymentsService {
    constructor(
        @InjectModel(ProductModel.name)
        private readonly productModel: Pagination<ProductModel>,

        @InjectModel(ProductModel.name)
        private readonly ordersModel: Pagination<OrdersModel>
    ) {}

    async success(body: any): Promise<SuccessResponse> {
        try {
            const { orderId } = body;

            const order = await this.ordersModel.findById(orderId);

            const productIds: any = order.products.map((item) => item._id);

            productIds.forEach(async (id: string, index: number) => {
                const product = await this.productModel.findById(id);
                product.in_stock = product.in_stock - order.products[index].quantity;
                await product.save();
            });

            return Success(true, "Payment successful", null);
        } catch (err) {
            return Success(false, err.message, null);
        }
    }

    async cancel(body: any): Promise<SuccessResponse> {
        console.log(body);

        try {
            return Success(false, "Payment was canceled", null);
        } catch (err) {
            return Success(false, err.message, null);
        }
    }
}
