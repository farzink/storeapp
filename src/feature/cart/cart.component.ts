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
    total = 0;
    ngOnInit(): void { }
    constructor(private router: Router, private notification: NotificationsService,
        private cartService: CartService, private authenticationService: AuthenticationService) {
        const context = this;
        this.cartService.getObservableCart().subscribe(c => {
            if (!authenticationService.isTokenExpired()) {
                this.updateCart(c);
            }
        });
        if (!authenticationService.isTokenExpired()) {
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

}
