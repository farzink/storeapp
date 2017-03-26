export class Profile{
    public id: number;
    public firstName: String;
    public isActive: Boolean;    
    constructor(data: any){
        this.id = data.id;
        this.firstName = data.firstName;
        this.isActive = data.isActive
    }
}