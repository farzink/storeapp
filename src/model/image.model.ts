export class Image {
    public id: number;
    public path: string;
    public itemId: number;
    public name: string;
    constructor(data: any) {
        if (data != null) {
            this.id = data.id;
            this.itemId = data.itemId;
            this.path = data.path;
            this.name = data.name;
        }
    }
}