export class Address {
    public id: number;
    public addressLine1: string;
    public addressLine2: string;
    public city: string;
    public state: string;
    public country: string;
    public zipCode: string;
    public phone: string;
    public isMain: boolean;
    public addressType: number;
    constructor(data: any) {
        this.id = data.id;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.city = data.city;
        this.state = data.state;
        this.zipCode = data.zipCode;
        this.phone = data.phone;
        this.isMain = data.isMain;
        this.addressType = data.addressType;
    }
}
