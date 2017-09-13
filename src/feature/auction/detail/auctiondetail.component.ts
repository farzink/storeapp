import { Auction } from './../../../model/auction.model';
import { BidViewModel } from './../../../model/bid.model';
import { AuthenticationService } from './../../../service/authentication.service';
import { NotificationsService } from 'angular2-notifications';
import { AuctionService } from './../../../service/auction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';




@Component({
    selector: 'app-auction-detail-component',
    templateUrl: './auctiondetail.component.html',
    styleUrls: ['./auctiondetail.component.css']
})
export class AuctionDetailComponent implements OnInit {
    auction: Auction;
    isLoading = true;
    auctionId;
    placeholderImage = 'assets/image/placeholder.jpg';
    canBid = false;
    bidAmount;
    constructor(private auctionService: AuctionService, private route: ActivatedRoute,
        private notification: NotificationsService, private authenticationService: AuthenticationService) {
        this.route.params.subscribe(val => {
            this.auctionId = (+this.route.snapshot.params['id'] || 0);
            this.canBid = !this.authenticationService.isTokenExpired();
            this.getAuction();
        });
    }

    bid() {

        if (this.bidAmount > this.auction.currentPrice + this.auction.minimumIncrement) {
            this.isLoading = true;
            const toSend: BidViewModel = {
                amount: this.bidAmount,
                auctionId: this.auctionId,
                bidId: 0
            };
            const result = {
                context: this,
                success(e) {
                    if (e.statusCode === 202) {
                        result.context.notification.success(
                            'Success',
                            `Your bid has been recorded.`
                        );
                        result.context.auction.currentPrice = e.item.currentPrice;
                    }
                    result.context.isLoading = false;
                },
                error(e) {
                    console.log(e, 'error');
                }
            };
            this.auctionService.bid(toSend, result);
        } else {
            this.notification.alert(
                'Alert',
                `You can not bid less than ${this.auction.currentPrice + this.auction.minimumIncrement}`
            );
        }
    }

    getAuction() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.auction = e.item;
                }
                result.context.isLoading = false;
            },
            error(e) {
                console.log(e, 'error');
            }
        };
        this.auctionService.getAuctionDetail(result.context.auctionId, result);
    }

    handle(e) {

    }

    ngOnInit() {

    }

}
