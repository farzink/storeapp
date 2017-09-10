export class Business{
    public profileId: number;
    public businessName: string;
    public businessVerificationDocumentName: string;
    public taxIdentification: string;
    public businessStatusType: string;    
    constructor(data: any){           
        //this.profileId = data.profileId;
        this.businessName= (data!= null) ? data.businessName: "";
        this.businessVerificationDocumentName = (data!= null) ? data.businessVerificationDocumentName: "";
        this.taxIdentification=(data!= null) ? data.taxIdentification: "";
        this.businessStatusType =(data!= null) ? data.isApproved: "";
    }    
}