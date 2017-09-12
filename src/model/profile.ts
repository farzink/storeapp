import { Business } from './Business.model';

export class Profile {
    public id: number;
    public email: string;
    public firstName: string;
    public lastName: string;
    public isActive: Boolean;
    public lastDateTime: string;
    public business: Business;
    public phone: string;
    constructor(data: any) {
        this.id = data.id;
        this.email = data.email;
        this.firstName = data.firstname;
        this.lastName = data.lastname;
        this.isActive = data.isActive;
        this.business = new Business(data.profileBusiness);
        this.phone = data.phone;
        //this.lastDateTime= new Date(data.updatedDateTime).toString();
        this.lastDateTime = data.lastDateTime;
    }
}
