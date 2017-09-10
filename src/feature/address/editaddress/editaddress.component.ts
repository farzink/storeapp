import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import 'rxjs/add/operator/map';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../service/address.service';
import { NotificationsService } from 'angular2-notifications';



@Component({
    selector: 'editaddress-component',
    templateUrl: './editaddress.component.html',
    styleUrls: ['./editaddress.component.css']
})
export class EditAddressComponent implements OnInit {
    addressForm: FormGroup;
    addressId: number;
    isLoading = false;
    ngOnInit(): void {
        this.addressId = +this.route.snapshot.params['id'];
        this.addressForm = this.formBuilder.group({
            id: '',
            addressLine1: ['', [Validators.required, Validators.minLength(4)]],
            addressLine2: '',
            city: ['', [Validators.required, Validators.minLength(3)]],
            state: ['', [Validators.required, Validators.minLength(2)]],
            // country: '',
            zipCode: ['', [Validators.required]],
            phone: ['', [Validators.required]]
        });
        this.getAddress(this.addressId);
    }
    constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
        private addressService: AddressService, private notification: NotificationsService) {
    }
    save(e) {
        e.preventDefault();
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 202) {
                    result.context.notification.success(
                        'Success',
                        'Address has been updated successfully!'
                    );
                    result.context.isLoading = false;
                    result.context.router.navigate(['/profile/addresses']);
                }
            }
        };
        this.addressService.update(this.addressForm.value, result);
    }
    getAddress(id: number) {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    // console.log(e);
                }
                result.context.setValues(e.item);
            }
        };
        this.addressService.getById(id, result);
    }
    setValues(data) {
        this.addressForm.setValue({
            id: data.id,
            addressLine1: data.addressLine1 ? data.addressLine1 : '',
            addressLine2: data.addressLine2 ? data.addressLine2 : '',
            city: data.city ? data.city : '',
            state: data.state ? data.state : '',
            // country: data.country ? data.country : '',
            zipCode: data.zipCode ? data.zipCode : '',
            phone: data.phone ? data.phone : ''
        });
    }

    get addressLine1() { return this.addressForm.get('addressLine1'); }
    get addressLine2() { return this.addressForm.get('addressLine2'); }
    get zipCode() { return this.addressForm.get('zipCode'); }
    get city() { return this.addressForm.get('city'); }
    get phone() { return this.addressForm.get('phone'); }
    get state() { return this.addressForm.get('state'); }
}
 // change(e){
    //     this.addressForm.controls['addressType'].patchValue({selected: 2});
    //     this.dt.nativeElement.value=2;
    //     //console.log(this.el.nativeElement);
    // }

// getAddressTypes() {
    //     var result = {
    //         context: this,
    //         success(e) {
    //             if (e.statusCode == 200)
    //                 result.context.addressTypes = e.item;
    //             let id = +result.context.route.snapshot.params['id'];
    //             result.context.getAddress(id);
    //         }
    //     };
    //     this.addressService.getAddressTypes(result);
    // }


