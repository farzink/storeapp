export class Profile{
    public id: number;
    public email: string;
    public firstName: string;
    public lastName: string;
    public isActive: Boolean;
    public lastDateTime:string;
    constructor(data: any){   
        console.log(data);
        this.id = data.id;
        this.email=data.email;
        this.firstName = data.firstname;
        this.lastName=data.lastname;
        this.isActive = data.isActive;
        //this.lastDateTime= new Date(data.updatedDateTime).toString();
        this.lastDateTime="Sat Apr 01 2017";
    }    
}