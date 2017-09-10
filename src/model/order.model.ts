import { OrderStatusTypes } from './orderStatysType.enum';
import { OrderDetail } from './orderDetail.model';
export class Order {
    id: number;
    creationDateTime: any;
    updatedDateTime: any;
    orderStatusTypes: OrderStatusTypes;
    profileId: number;
    total: number;
    orderDetails: Array<OrderDetail>;
    constructor(data: any) {
        this.id = data.id;
        this.creationDateTime = data.creationDateTime;
        this.updatedDateTime = data.updatedDateTime;
        this.orderStatusTypes = data.OrderStatusTypes;
        this.profileId = data.profileId;
        this.total = data.total;
        this.orderDetails = data.orderDetails;
    }
}
