import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '../../../service/address.service';
import { ProfileService } from '../../../service/profile.service';
import { NotificationsService } from 'angular2-notifications';




@Component({
    selector: 'businessaddress-component',
    templateUrl: './businessaddress.component.html',
    styleUrls: ['./businessaddress.component.css']
})
export class BusinessAddressEditComponent implements OnInit {
    addressForm: FormGroup;
    ngOnInit(): void {
        this.addressForm = this.formBuilder.group({
            id: '',
            addressLine1: ['', [Validators.required, Validators.minLength(4)]],
            addressLine2: '',
            city: ['', [Validators.required, Validators.minLength(3)]],
            state: ['', [Validators.required, Validators.minLength(2)]],
            zipCode: ['', [Validators.required]],
            phone: ['', [Validators.required]]
        });
        this.getAddress();
    }
    constructor(private profileService: ProfileService, private router: Router, private formBuilder: FormBuilder,
        private addressService: AddressService, private notification: NotificationsService) {
    }
    update(e) {
        e.preventDefault();
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 202) {
                    result.context.notification.success(
                        'address has been updated successfully!',
                        '',
                        {
                            showProgressBar: true,
                            pauseOnHover: false,
                            clickToClose: false,
                            maxLength: 10
                        }
                    );
                }
            }
        };
        this.profileService.updateBusinessAddress(this.addressForm.value, result);
    }
    getAddress() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    console.log(e);
                    result.context.addressForm.patchValue({ addressLine1: e.item.addressLine1 });
                    result.context.addressForm.patchValue({ addressLine2: e.item.addressLine2 });
                    result.context.addressForm.patchValue({ city: e.item.city });
                    result.context.addressForm.patchValue({ state: e.item.state });
                    result.context.addressForm.patchValue({ country: e.item.country });
                    result.context.addressForm.patchValue({ zipCode: e.item.zipCode });
                    result.context.addressForm.patchValue({ phoneLine: e.item.phoneLine });
                    result.context.addressForm.patchValue({ addressType: e.item.addressType });
                }
            }
        };
        this.profileService.getBusinessAddress(result);
    }

    get addressLine1() { return this.addressForm.get('addressLine1'); }
    get addressLine2() { return this.addressForm.get('addressLine2'); }
    get zipCode() { return this.addressForm.get('zipCode'); }
    get city() { return this.addressForm.get('city'); }
    get phone() { return this.addressForm.get('phone'); }
    get state() { return this.addressForm.get('state'); }
}
