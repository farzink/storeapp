import { Order } from './order.model';
import { Item } from './item.model';
export class OrderDetail {
    id: number;
    creationDateTime: any;
    updatedDateTime: any;
    title: string;
    name: string;
    price: number;
    manufacturer: string;
    description: string;
    quantity: number;
    item: Item;
    itemId: number;
    order: Order;
    orderId: number;
    constructor(data: any) {
        this.id = data.id;
        this.creationDateTime = data.creationDateTime;
        this.updatedDateTime = data.updatedDateTime;
        this.title = data.title;
        this.name = data.name;
        this.price = data.price;
        this.manufacturer = data.manufacturer;
        this.description = data.description;
        this.quantity = data.quantity;
        this.item = data.item;
        this.itemId = data.itemId;
        this.order = data.order;
        this.orderId = data.orderId;
    }
}
