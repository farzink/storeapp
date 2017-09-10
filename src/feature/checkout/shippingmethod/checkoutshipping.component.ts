import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'app-checkout-shipping-component',
    templateUrl: './checkoutshipping.component.html'
})
export class CheckoutShippingComponent implements OnInit {
    isLoading = false;
    constructor(private notification: NotificationsService, private router: Router) {
    }
    ngOnInit(): void {

    }
}
