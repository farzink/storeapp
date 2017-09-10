import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DropDown } from '../../../model/dropdown.model';
import { AddressService } from '../../../service/address.service';
import { NotificationsService } from 'angular2-notifications';



@Component({
    selector: 'addressinfo-component',
    templateUrl: './addressinfo.component.html',
    styleUrls: ['./addressinfo.component.css']
})
export class AddressInfoComponent implements OnInit {
    addressForm: FormGroup;
    addressTypes: Array<DropDown>;
    isLoading = false;
    ngOnInit(): void {
        this.addressForm = this.formBuilder.group({
            addressLine1: ['', [Validators.required, Validators.minLength(4)]],
            addressLine2: '',
            city: ['', [Validators.required, Validators.minLength(3)]],
            state: ['', [Validators.required, Validators.minLength(2)]],
            // country: '',
            zipCode: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            addressType: ''
        });
        this.getAddressTypes();
    }
    constructor(private router: Router, private formBuilder: FormBuilder,
        private addressService: AddressService, private notification: NotificationsService) {
    }
    add(e) {
        e.preventDefault();
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 201) {
                    result.context.notification.success(
                        'Success',
                        'Address has been created successfully!',
                        {
                            showProgressBar: true,
                            pauseOnHover: true,
                            clickToClose: true,
                            timeOut: 3000
                        }
                    );
                    result.context.isLoading = false;
                    result.context.router.navigate(['/profile/addresses']);
                }
            }
        };
        this.addressService.add(this.addressForm.value, result);
    }
    getAddressTypes() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.addressTypes = e.item;
                }
                result.context.changeAddressType(e.item[0].value);
            }
        };
        this.addressService.getAddressTypes(result);
    }
    changeAddressType(value) {
        this.addressForm.patchValue({
            addressType: value
        });
    }

    get addressLine1() { return this.addressForm.get('addressLine1'); }
    get addressLine2() { return this.addressForm.get('addressLine2'); }
    get zipCode() { return this.addressForm.get('zipCode'); }
    get city() { return this.addressForm.get('city'); }
    get phone() { return this.addressForm.get('phone'); }
    get state() { return this.addressForm.get('state'); }
}
