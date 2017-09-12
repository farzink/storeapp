import { CartService } from './../../service/cart.service';
import { NotificationsService } from 'angular2-notifications';
import { ProfileService } from './../../service/profile.service';
import { ItemService } from './../../service/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from './../../model/item.model';
import { Http } from '@angular/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';




@Component({
    selector: 'searchresult-component',
    templateUrl: './searchresult.component.html',
    styleUrls: ['./searchresult.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class SearchResultComponent implements OnInit {
    selected: string;

    // pagination
    currentIndex = 0;
    hasNext = false;
    hasPrevious = false;
    size = 12;
    maxNumberOfPageButtons = 5;
    total = 0;
    numberOfPages: any = [];
    placeholderImage = 'assets/image/placeholder.jpg';
    categoryId = 0;
    // end of pagination
    isLoading = true;
    searchResult: any;

    constructor(public http: Http, private route: ActivatedRoute, private router: Router,
        private profileService: ProfileService, private itemService: ItemService,
        private cartService: CartService, private notification: NotificationsService) {
        this.route.queryParams.subscribe(val => {
            this.search();
        });
    }

    ngOnInit(): void {

    }

    search(sort = 0) {
        this.isLoading = true;
        const searchTerm = this.route.snapshot.queryParams.q;
        this.categoryId = (+this.route.snapshot.queryParams.ci || 0);
        this.size = (+this.route.snapshot.queryParams.size || 12);
        this.selected = searchTerm;
        if (searchTerm === '' || searchTerm === undefined) {
            console.log('later');
            this.isLoading = false;
        } else {
            const result = {
                context: this,
                success(e) {
                    if (e.statusCode === 200) {
                        result.context.searchResult = e.item.items;
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
            this.itemService.searchItems(
                {
                    term: searchTerm,
                    sort: sort,
                    page: q,
                    size: this.size,
                    categoryId: this.categoryId
                },
                result);
        }
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

    keypressed(e) {
        if (e.keyCode === 13 && this.selected !== '') {
            this.search();
        }
    }

    changeSort(sortNumber) {
        this.search(sortNumber);
    }

    changePerPage(perpage) {
        // this.size = perpage;
        this.router.navigate(['/search'], { queryParams: { q: this.selected, size: perpage.target.value, ci: this.categoryId } });
        // this.search();
    }

    addToWishlist(id) {
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 201) {
                    result.context.notification.success(
                        'Success',
                        'item has been added to your wishlist successfully!'
                    );
                }
            },
            error(e) {
                result.context.isLoading = false;
            },
            complete(e) {
                result.context.isLoading = false;
            }
        };
        this.profileService.addToWishlist(id, result);
    }

    addToCart(item) {
        console.log(item);
        const result = {
            context: this,
            success(e) {
                result.context.cartService.update();
                result.context.notification.success(
                    'Success',
                    `${item.name} has been added to your cart!`
                );
            },
            error(e) {
                result.context.isLoading = false;
            },
            complete(e) {
                result.context.isLoading = false;
            }
        };

        this.cartService.addToCart({
            itemId: item.id,
            quantity: 1
        }, result);
    }

    observableSource = (keyword: any): Observable<any[]> => {
        const url: string =
            'http://localhost:54434/api/home/suggestion/' + keyword;
        if (keyword) {
            return this.http.get(url).map(res => {
                const json = res.json();
                return json.results;
            });
        } else {
            return Observable.of([]);
        }
    }

}


// "assets/css/select_option1.css", "assets/js/selectBox.js",