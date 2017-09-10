import { CartService } from './../../../service/cart.service';
import { AddressService } from './../../../service/address.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'app-checkout-address-component',
    templateUrl: './checkoutaddress.component.html',
    styleUrls: ['./checkoutaddress.component.css']
})
export class CheckoutAddressComponent implements OnInit {
    addresses: any;
    isLoading = true;
    selectedAddress: any = {
        'selectedBillingAddress': 0,
        'selectedShippingAddress': 0
    };

    sameAddress = true;

    constructor(private notification: NotificationsService, private router: Router,
        private addressService: AddressService, private cartService: CartService) {
    }
    ngOnInit(): void {
        this.getAddresses();
    }

    nextStep() {
        if (this.sameAddress) {
            this.selectedAddress.selectedShippingAddress = this.selectedAddress.selectedBillingAddress;
        }

        this.updateOrderWithAddress();

        this.router.navigate(['/checkout/payment']);
    }

    updateOrderWithAddress() {
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {

            },
            error(e) {
                result.context.notification.error('Error', 'Problem getting your addresses');
            }
        };
        this.cartService.updateOrderWithAddress(this.selectedAddress, result);
    }

    getAddresses() {
        const result = {
            context: this,
            success(e) {
                result.context.addresses = e.item;
                result.context.isLoading = false;
            },
            error(e) {
                result.context.notification.alert('Error', 'Problem getting your addresses');
            }
        };
        this.addressService.getAll(result);
    }
}
