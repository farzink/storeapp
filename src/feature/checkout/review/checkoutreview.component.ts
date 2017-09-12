import { CheckoutReview } from './../../../model/checkoutReview.model';
import { OrderSericve } from './../../../service/order.service';
import { Order } from './../../../model/order.model';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'app-checkout-shipping-component',
    templateUrl: './checkoutreview.component.html'
})
export class CheckoutReviewComponent implements OnInit {
    isLoading = true;
    checkout: CheckoutReview;
    total = 0;
    constructor(private notification: NotificationsService, private router: Router, private orderService: OrderSericve) {
    }

    ngOnInit(): void {
        this.getCheckoutReview();
    }


    getCheckoutReview() {
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                console.log(e.item);
                result.context.checkout = e.item;
                result.context.isLoading = false;

                for (const i of e.item.orderDetails) {
                    result.context.total += i.quantity * i.price;
                }

            },
            error(e) {
                result.context.notification.alert('Error', 'Problem getting your addresses');
                result.context.isLoading = false;
            }
        };
        this.orderService.getCheckoutReview(result);
    }

}
