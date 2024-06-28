import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Pagination } from "mongoose-paginate-ts";
import SuccessResponse from "types/success.interface";
import Success from "utils/success-response";
import { OrdersModel } from "./orders.model";
import { OrderDTO } from "./dto/orders.dto";
import { STATUS_CODES } from "types/orderStatus";
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(OrdersModel.name)
        private readonly ordersModel: Pagination<OrdersModel>
    ) {}

    async getOrders(page: number, limit: number): Promise<SuccessResponse> {
        try {
            const orders = await this.ordersModel.paginate({
                limit,
                page,
                sort: {
                    createdAt: -1,
                },
            });

            return Success(true, "Successful", orders);
        } catch (err) {
            return Success(false, err.message, null);
        }
    }

    async createStripeSession(products: any) {
        const body = {
            line_items: products.map((product: any) => {
                const discountedPrice = product.sale
                    ? product.price - (product.price * product.sale) / 100
                    : product.price;
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            description: product.description,
                            images: product.images,
                        },
                        unit_amount: discountedPrice * 100,
                    },
                    quantity: product.quantity,
                    // customer_email: "",
                };
            }),
            mode: "payment",
            success_url: `http://localhost:8800/payments/success`,
            cancel_url: `http://localhost:8800/payments/cancel`,
        };

        const session = await stripe.checkout.sessions.create(body);

        return session;
    }

    async createOrder(body: OrderDTO): Promise<SuccessResponse> {
        const { title, products } = body;
        try {
            const order = await this.ordersModel.create({
                title: title ? title : "Պատվեր",
                products,
                status: 0,
            });

            const resBody: any = {
                order_id: order._id,
            };

            const session: any = await this.createStripeSession(products);
            if (session) {
                resBody.session_url = session.url;
            }

            return Success(true, "Successful", resBody);
        } catch (err) {
            return Success(false, err.message, null);
        }
    }

    async updateStatus(id: string, status: number): Promise<SuccessResponse> {
        try {
            const order = await this.ordersModel.findById<OrdersModel>(id);
            order.status = status;
            await order.save();
            return Success(true, "Successful", order);
        } catch (err) {
            return Success(false, err.message, null);
        }
    }

    async delete(id: string): Promise<SuccessResponse> {
        try {
            await this.ordersModel.findByIdAndDelete(id).exec();
            return Success(true, "Successfully deleted", null);
        } catch (err) {
            return Success(false, err.message, null);
        }
    }
}
