import { NotificationsService } from 'angular2-notifications';
import { AuctionService } from './../../../service/auction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'app-auctions-component',
    templateUrl: './auctions.component.html',
    styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent {
    // pagination
    currentIndex = 0;
    hasNext = false;
    hasPrevious = false;
    size = 12;
    maxNumberOfPageButtons = 5;
    total = 0;
    numberOfPages: any = [];

    // end of pagination
    isLoading = true;
    auctions: any;
    constructor(public http: Http, private route: ActivatedRoute, private router: Router,
        private auctionService: AuctionService, private notification: NotificationsService) {
        this.route.queryParams.subscribe(val => {
            this.getAuctions();
        });
    }

    getAuctions(sort = 0) {
        this.isLoading = true;
        // const searchTerm = this.route.snapshot.queryParams.q;
        this.size = (+this.route.snapshot.queryParams.size || 12);
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.auctions = e.item.items;
                    result.context.paginate(e.item);
                }
            },
            error(e) {
                result.context.isLoading = false;
            },
            complete(e) {
                result.context.isLoading = false;
            }
        };

        const q = (this.route.snapshot.queryParams.page) ? +this.route.snapshot.queryParams.page : 0;
        this.auctionService.getAll(
            {
                sort: sort,
                page: q,
                size: this.size
            },
            result);
    }

    paginate(data) {
        this.currentIndex = data.currentIndex;
        this.hasNext = data.hasNext;
        this.hasPrevious = data.hasPrevious;
        this.total = data.total;

        if (this.maxNumberOfPageButtons * this.size < this.total) {
            if (this.currentIndex < 3) {
                this.numberOfPages = Array(this.maxNumberOfPageButtons).fill(0).map((x, i) => i + 1 - this.currentIndex);
            } else if ((this.currentIndex + 1) * this.size > this.total) {
                this.numberOfPages = Array(this.maxNumberOfPageButtons).fill(0).map((x, i) => i - 3);
            } else {
                this.numberOfPages = Array(this.maxNumberOfPageButtons).fill(0).map((x, i) => i - 2);
            }
        } else {
            const maxNumberOfButtons = Math.floor(this.total / this.size);
            const margin = (this.total % this.size === 0) ? 0 : 1;
            this.numberOfPages = Array(maxNumberOfButtons + margin).fill(0).map((x, i) => i + 1 - this.currentIndex);
        }

    }

    changeSort(sortNumber) {
        this.getAuctions(sortNumber);
    }

    changePerPage(perpage) {
        // this.size = perpage;
        this.router.navigate(['/auctions'], { queryParams: { size: perpage.target.value } });
        // this.search();
    }
}
