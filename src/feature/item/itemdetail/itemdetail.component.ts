import { CartService } from './../../../service/cart.service';
import { AuthenticationService } from './../../../service/authentication.service';
import { Profile } from './../../../model/profile';
import { ProfileService } from './../../../service/profile.service';
import { ItemRating } from './../../../model/itemRating.model';
import { avatarPlaceholder } from './../../../utility/link';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../../service/item.service';
import { NotificationsService } from 'angular2-notifications';
import { OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent } from 'angular-star-rating/star-rating-struct';



@Component({
    selector: 'app-itemdetail-component',
    templateUrl: './itemdetail.component.html',
    styleUrls: ['./itemdetail.component.css']
})
export class ItemDetailComponent implements OnInit {
    item: any;
    isLoading = true;
    itemId;
    avatarPlaceholder = avatarPlaceholder;
    rating: ItemRating = { rating: 0, reviewers: 0 };
    currentUser: Profile;
    isLoggedIn = false;
    onRatingChangeResult: OnRatingChangeEven;
    ngOnInit(): void {

    }
    constructor(private itemService: ItemService, private route: ActivatedRoute, private cartService: CartService,
        private notification: NotificationsService, private profileService: ProfileService,
        private authenticationService: AuthenticationService) {
        this.route.params.subscribe(val => {
            this.itemId = (+this.route.snapshot.params['id'] || 0);
            this.getItems();
            this.getItemRating();
            if (!this.authenticationService.isTokenExpired()) {
                console.log('loggedd in');
                this.isLoggedIn = true;
                this.getCurrentUser();
            } else {
                console.log('not loggedd in');
                this.isLoggedIn = false;
                this.currentUser = null;
            }

        });
    }

    getCurrentUser() {
        const result = {
            context: this,
            success(e) {
                console.log(e);
                result.context.currentUser = e;
            },
            error(e) {
                console.log(e, 'error');
            }
        };
        this.profileService.getUserData(result);

    }

    getItemRating() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.rating = e.item;
                }
            },
            error(e) {
                console.log(e, 'error');
            }
        };
        this.itemService.getItemRating(result.context.itemId, result);
    }

    getItems() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.item = e.item;
                }
                result.context.isLoading = false;
            },
            error(e) {
                console.log(e, 'error');
            }
        };
        this.itemService.getItemDetail(result.context.itemId, result);
    }

    addToCart(item) {
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

    onRatingChange = ($event: OnRatingChangeEven) => {
        console.log('onRatingUpdated $event: ', $event);
        this.onRatingChangeResult = $event;
    }


}
