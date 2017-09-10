import { Component, OnInit, Injectable, ElementRef, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { Profile } from '../../../model/profile';
import { ProfileService } from '../../../service/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';




@Component({
    selector: 'profileedit-component',
    templateUrl: './profileedit.component.html',
    styleUrls: ['./profileedit.component.css']
})
export class ProfileEditComponent implements OnInit {
    @ViewChild('file') fileElement: ElementRef;
    isLoading = true;
    profileForm: FormGroup;
    profile: Profile;
    ngOnInit(): void {
        this.profileForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
        });
        this.getProfileInfo();
        this.isLoading = false;
    }
    constructor(private profileService: ProfileService, private router: Router, private formBuilder: FormBuilder,
         private notification: NotificationsService) {  }
    getProfileInfo() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.profile = e.item;
                    result.context.profileForm.patchValue({ firstName: e.item.firstName });
                    result.context.profileForm.patchValue({ lastName: e.item.lastName });
                }
            },
            error(e) {
                console.log(e);
            }
        };
        this.profileService.getById(-1, result);
    }
    update(e) {
        this.isLoading = true;
        e.preventDefault();
        const result = {
            context: this,
            success(d) {
                if (d.statusCode === 202) {
                    result.context.notification.success(
                        'Profile has been updated successfully!',
                        '',
                        {
                            showProgressBar: true,
                            pauseOnHover: false,
                            clickToClose: false,
                            maxLength: 10
                        }
                    );
                    result.context.isLoading = false;
                }
            },
            error(e) {
                console.log(e);
            }
        };
        this.profileService.updateProfile(this.profileForm.value, result);
    }

    get firstName() { return this.profileForm.get('firstName'); }
    get lastName() { return this.profileForm.get('lastName'); }
}
