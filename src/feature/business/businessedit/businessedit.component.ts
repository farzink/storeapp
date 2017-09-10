import { Component, OnInit, Injectable, ElementRef, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { Profile } from '../../../model/profile';
import { ProfileService } from '../../../service/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';




@Component({
    selector: 'businessedit-component',
    templateUrl: './businessedit.component.html',
    styleUrls: ['./businessedit.component.css']
})
export class BusinessEditComponent implements OnInit {
    @ViewChild('file') fileElement: ElementRef;
    isLoading = false;
    businessForm: FormGroup;
    document: string;
    ngOnInit(): void {
        this.businessForm = this.formBuilder.group({
            businessName: ['', [Validators.required, Validators.minLength(4)]],
            taxIdentification: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.getBusinessInfo();
    }
    constructor(private profileService: ProfileService, private router: Router, private formBuilder: FormBuilder,
         private notification: NotificationsService) { }
    getBusinessInfo() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.businessForm.patchValue({ businessName: e.item.businessName });
                    result.context.businessForm.patchValue({ taxIdentification: e.item.taxIdentification });
                    // result.context.notification.success(
                    //         'Item loaded successfully!',
                    //         '',
                    //         {
                    //             showProgressBar: true,
                    //             pauseOnHover: false,
                    //             clickToClose: false,
                    //             maxLength: 10
                    //         }
                    //     );
                }
            },
            error(e) {
                console.log(e);
            }
        };
        this.profileService.getBusiness(result);
    }
    update(e) {
        e.preventDefault();
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 202) {
                    result.context.notification.success(
                        'Success',
                        'Business has been updated successfully.',
                        {
                            showProgressBar: true,
                            pauseOnHover: true,
                            clickToClose: true,
                            timeOut: 3000,
                        }
                    );
                    result.context.isLoading = false;
                    result.context.router.navigate(['/profile/business/manage']);
                }
            },
            error(e) {
                console.log(e);
            }
        };
        this.profileService.updateBusiness(this.businessForm.value, result);
    }

    get businessName() { return this.businessForm.get('businessName'); }
    get taxIdentification() { return this.businessForm.get('taxIdentification'); }
}
