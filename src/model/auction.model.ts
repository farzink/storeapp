import { AuctionBid } from './auctionbid.model';
import { Item } from './item.model';
import { Profile } from './profile';
import { StatusType } from './statusType.enum';
export class Auction {
    initialPrice: number;
    startDate: any;
    endDate: any;
    minimumIncrement: number;
    currentPrice: number;
    profile: Profile;
    profileId: number;
    item: Item;
    itemId: number;
    title: string;
    description: string;
    statusTypes: StatusType;
    deletionPolicyInMintues: number;
    coolingOutInterval: number;
    auctionBids: Array<AuctionBid>;
    constructor(data: any) {
        this.initialPrice = data.initialPrice;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.minimumIncrement = data.minimumIncrement;
        this.currentPrice = data.currentPrice;
        this.profile = data.profile;
        this.profileId = data.profileId;
        this.item = data.item;
        this.itemId = data.itemId;
        this.title = data.title;
        this.description = data.description;
        this.statusTypes = data.statusTypes;
        this.deletionPolicyInMintues = data.deletionPolicyInMintues;
        this.coolingOutInterval = data.coolingOutInterval;
        this.auctionBids = data.auctionBids;
    }
}
