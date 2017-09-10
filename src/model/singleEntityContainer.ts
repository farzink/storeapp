export class SingleEntityContainer<T> {
    public item: T;
    public hasNext: boolean;
    public hasPrevious: boolean;
    constructor(data: any) {
        this.item = data.item;
        this.hasNext = data.hasNext;
        this.hasPrevious = data.hasPrevious;
    }
}
