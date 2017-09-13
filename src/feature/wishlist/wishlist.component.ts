import { CartService } from './../../service/cart.service';
import { ProfileService } from './../../service/profile.service';
import { Item } from './../../model/item.model';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-wishlist-component',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css']
})
export class WhishlistComponent implements OnInit {
    isLoading = true;
    wishlist: Array<Item>;
    hasNext = true;
    hasPrevious = true;
    placeholderImage = 'assets/image/placeholder.jpg';
    ngOnInit(): void {
        this.getWishlist();
    }
    constructor(private router: Router, private cartService: CartService, private route: ActivatedRoute, private formBuilder: FormBuilder,
        private profileService: ProfileService, private notification: NotificationsService) { }

    getWishlist() {
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.wishlist = e.item.results.items;
                }
            },
            error(e) {
                result.context.notification.error(
                    'Error',
                    'There was a problem getting your wishlist, please try again later!',
                    {
                        showProgressBar: true,
                        pauseOnHover: true,
                        clickToClose: true,
                        timeOut: 3000
                    }
                );
            },
            complete() {
                result.context.isLoading = false;
            }
        };
        this.profileService.getWishlist(result);
    }

    removeFromWishlist(item) {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 202) {
                    const index = result.context.wishlist.indexOf(item);
                    if (index !== -1) {
                        result.context.wishlist.splice(index, 1);
                    }
                    result.context.notification.success(
                        'Success',
                        'item has been removed from your wishlist!'
                    );
                }
            },
            error() {
                result.context.notification.error(
                    'Error',
                    'please try again.'
                );
            }
        };
        this.profileService.removeFromWishlist(item.id, result);
    }

    addToCart(item) {
        const result = {
            context: this,
            success(e) {
                result.context.cartService.addToObservableCart(e);
                result.context.notification.success(
                    'Success',
                    `${item.name} has been added to your cart!`
                );
            }
        };
        item.quantity = 1;
        this.cartService.addToCart(item, result);
    }
}


