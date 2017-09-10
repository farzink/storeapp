import { Auction } from './auction.model';
import { Profile } from './profile';
export class AuctionBid {
    profile: Profile;
    profileId: number;
    auction: Auction;
    auctionId: number;
    amount: number;
    constructor(data: any) {
        this.profile = data.profile;
        this.profileId = data.profileId;
        this.auction = data.auction;
        this.auctionId = data.auctionId;
        this.amount = data.amount;
    }
}
