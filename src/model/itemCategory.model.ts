import { Item } from './item.model';
export class ItemCategory {
    name: string;
    description: string;
    items: Array<Item>;
    constructor(data: any) {
        this.name = data.name;
        this.description = data.description;
        this.items = data.items;
    }
}
