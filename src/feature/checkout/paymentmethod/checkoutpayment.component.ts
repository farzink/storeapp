import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'app-checkout-payment-component',
    templateUrl: './checkoutpayment.component.html'
})
export class CheckoutPaymentComponent implements OnInit {
    isLoading = false;
    constructor(private notification: NotificationsService, private router: Router) {
    }
    ngOnInit(): void {

    }
}
