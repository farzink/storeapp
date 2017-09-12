import { OrderDetail } from './orderDetail.model';
import { Address } from './address.model';
export class CheckoutReview {
    email: string;
    phone: string;
    name: string;
    shippingAddress: Address;
    billingAddress: Address;
    orderDetails: Array<OrderDetail>;
    constructor(data: any) {
        this.email = data.email;
        this.phone = data.phone;
        this.shippingAddress = data.shippingAdress;
        this.billingAddress = data.billingAddress;
        this.orderDetails = data.orderDetails;
        this.name = data.name;
    }
}