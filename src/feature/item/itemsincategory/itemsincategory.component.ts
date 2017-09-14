import { ProfileService } from './../../../service/profile.service';
import { CartService } from './../../../service/cart.service';
import { ItemService } from './../../../service/item.service';
import { NotificationsService } from 'angular2-notifications';
import { placeholderImage, itemPath } from './../../../utility/link';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-items-category-component',
    templateUrl: 'itemsincategory.component.html',
    styleUrls: ['./itemsincategory.component.scss']
})

export class ItemsInCategoryComponent implements OnInit {
    constructor(private route: ActivatedRoute, private notification: NotificationsService,
        private itemService: ItemService, private router: Router, private cartService: CartService,
        private profileService: ProfileService) {
        this.route.queryParams.subscribe(val => {
            this.getItems();
        });
    }

    currentIndex = 0;
    hasNext = false;
    hasPrevious = false;
    size = 12;
    maxNumberOfPageButtons = 5;
    total = 0;
    numberOfPages: any = [];
    placeholderImage = placeholderImage;
    // end of pagination
    isLoading = true;
    catId;
    items: any;

    getItems(sort = 0) {
        this.isLoading = true;
        this.catId = (+this.route.snapshot.params['id'] || 0);
        this.size = (+this.route.snapshot.queryParams.size || 12);

        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.items = e.item.items;
                    result.context.paginate(e.item);
                    result.context.isLoading = false;
                }
            },
            error(e) {
                result.context.notification.error('Problem', 'Problem Getting items, try again later.');
            }
        };
        const page = (this.route.snapshot.queryParams.page) ? +this.route.snapshot.queryParams.page : 0;
        this.itemService.getItemsOfCategory({
            id: this.catId,
            sort: sort,
            page: page,
            size: this.size
        }, result);

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
        this.getItems(sortNumber);
    }

    changePerPage(perpage) {
        // this.size = perpage;
        this.router.navigate(['/search/category', this.catId], { queryParams: { size: perpage.target.value } });
        // this.search();
    }

    addToWishlist(id) {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 201) {
                    result.context.notification.success(
                        'Success',
                        'item has been added to your wishlist successfully!'
                    );
                }
            }
        };
        this.profileService.addToWishlist(id, result);
    }

    addToCart(item) {
        const result = {
            context: this,
            success(e) {
                // result.context.cartService.addToObservableCart(e);
                result.context.cartService.update();
                result.context.notification.success(
                    'Success',
                    `${item.name} has been added to your cart!`
                );
            }
        };

        this.cartService.addToCart({
            itemId: item.id,
            quantity: 0
        }, result);
    }

    ngOnInit() { }
}
