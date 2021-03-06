import { AuthenticationService } from './../../service/authentication.service';
import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';



@Component({
    selector: 'app-cart-component',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    isLoading = true;
    itemsInCart: any;
    isLoggedIn = false;
    total = 0;
    ngOnInit(): void { }
    constructor(private router: Router, private notification: NotificationsService,
        private cartService: CartService, private authenticationService: AuthenticationService) {
        this.isLoggedIn = !authenticationService.isTokenExpired();
        this.cartService.getObservableCart().subscribe(c => {
            if (this.isLoggedIn) {
                this.updateCart(c);
            }
        });
        if (this.isLoggedIn) {
            this.cartService.update();
        }
    }

    updateCart(e) {
        this.total = 0;
        this.itemsInCart = e;
        for (const i of e.orderDetails) {
            this.total += i.quantity * i.price;
        }
    }

    updateCartServerSide(id, e) {
        const result = {
            context: this,
            success(d) {
                result.context.cartService.update();
                // result.context.notification.success(
                //     'Success',
                //     `${item.name} has been added to your cart!`
                // );
            }
        };
        // item.quantity = 1;
        this.cartService.addToCart({
            itemId: id,
            quantity: e.target.value
        }, result);
    }

    removeItemFromCart(id) {
        const result = {
            context: this,
            success(d) {
                result.context.cartService.update();
                result.context.notification.success(
                    'Success',
                    `item has been removed from your cart!`
                );
            }
        };
        // item.quantity = 1;
        this.cartService.removeFromCart({
            id: id
        }, result);
    }

}
