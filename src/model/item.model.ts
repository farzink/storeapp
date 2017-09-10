import { Image } from './image.model';
export class Item {
    public id: number;
    public itemId: number;
    public quantity: number;
    public profileId: number;
    public isActive: boolean;
    public manufacturer: string;
    public manufacturingType: number;
    public description: number;
    public name: string;
    public price: number;
    public defaultImage: string;
    public title: string;
    public isWishListedPourMoi: boolean;
    public verificationCode: string;
    public businessName: string;
    public images: Array<Image>;
    public material: string;
    public brand: string;
    public weight: string;
    public height: string;
    public feature: string;
    public detail: string;
    public processingTime: string;
    public cost: string;
    public hasFreeShipping: boolean;
    public location: string;
    public hasLocalPickup: boolean;
    public carrier: string;
    public width: string;
    constructor(data: any) {
        this.id = data.id;
        this.itemId = data.itemId;
        this.quantity = data.quantity;
        this.profileId = data.profileId;
        this.description = data.description;
        this.defaultImage = data.defaultImage;
        this.isActive = data.isActive;
        this.manufacturer = data.manufacturer;
        this.manufacturingType = data.manufacturingType;
        this.name = data.name;
        this.price = data.price;
        this.title = data.title;
        this.isWishListedPourMoi = data.isWishListedPourMoi;
        this.verificationCode = data.verificationCode;
        this.businessName = data.businessName;
        this.images = data.images;
        this.material = data.material;
        this.brand = data.brand;
        this.weight = data.weight;
        this.height = data.height;
        this.feature = data.feature;
        this.detail = data.detail;
        this.processingTime = data.processingTime;
        this.cost = data.cost;
        this.hasFreeShipping = data.hasFreeShipping;
        this.location = data.location;
        this.hasLocalPickup = data.hasLocalPickup;
        this.carrier = data.carrier;
    }
}