export class Address{
    public AddressLine1: string;
        public AddressLine2: string;
        public City: string;
        public State: string;
        public Country: string;
        public ZipCode: string;
        public Phone: string;
        public IsMain: boolean;        
        public AddressType: number;
    constructor(data: any){   
        console.log(data);
        this.AddressLine1 = data.addressLine1;
        this.AddressLine2=data.addressLine2;
        this.City = data.city;
        this.State=data.state;
        this.ZipCode = data.zipCode;
        this.Phone = data.phone;
        this.IsMain = data.isMain;
        this.AddressType = data.addressType;
    }    
}