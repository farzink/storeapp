import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AddressService } from '../../../service/address.service';
import { NotificationsService } from 'angular2-notifications';



@Component({
    selector: 'addresses-component',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
    addresses: any;
    isLoading = true;
    ngOnInit(): void {
        this.getAddresses();
    }
    constructor(private router: Router, private addressService: AddressService, private notification: NotificationsService) {
    }
    getAddresses() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {

                }
                result.context.addresses = e.item;
                result.context.isLoading = false;
            }
        };
        this.addressService.getAll(result);
    }

    delete(e) {
        this.isLoading = true;
        const result = {
            context: this,
            success(d) {
                if (d.statusCode === 200) {
                    result.context.notification.success(
                        'Success',
                        'Address has been deleted successfully!',
                        {
                            showProgressBar: true,
                            pauseOnHover: true,
                            clickToClose: true,
                            timeOut: 3000
                        }
                    );
                    result.context.getAddresses();
                    // result.context.addresses = [];
                    // result.context.addresses = d;
                }
            },
            error(er) {
                result.context.notification.error(
                    'Error',
                    'There was a problem, try again later!',
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
        this.addressService.delete(e, result);
    }
}
