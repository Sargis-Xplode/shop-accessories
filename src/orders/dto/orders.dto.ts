import { IsNotEmpty, IsOptional } from "class-validator";
import { CartItemDTO } from "types/cardItem.interface";
import { OrderUserInfo } from "types/orderUserInfo.inferface";

export class OrderDTO {
    @IsOptional()
    readonly title: string;

    @IsNotEmpty()
    readonly products: CartItemDTO[];

    @IsNotEmpty()
    readonly user_info: OrderUserInfo;
}
