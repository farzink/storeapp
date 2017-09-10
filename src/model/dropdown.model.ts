export class DropDown {
    public Key: string;
    public Value: string;
    public IsActive: boolean;
    constructor(data: any) {
        console.log(data);
        this.Key = data.key;
        this.Value = data.value;
        this.IsActive = data.isActive
    }
}