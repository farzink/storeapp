export class WebCallResult<T>{
    public item: T;
    public statusCode: number;
    public message: String;
    constructor(item: T, statusCode: number, message: String) {
        this.item = item;
        this.statusCode = statusCode;
        this.message = message;
    }
}
