import { Component, OnInit, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Profile } from '../../../model/profile';
import { ProfileService } from '../../../service/profile.service';


@Component({
    selector: 'profileinfo-component',
    templateUrl: './profileinfo.component.html',
    styleUrls: ['./profileinfo.component.css']
})
export class ProfileInfoComponent implements OnInit {
    profile: Profile;
    isProfileBusy = true;
    ngOnInit(): void {
        this.getProfile();
    }

    constructor(private profileService: ProfileService) {
    }
    getProfile() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.profile = e.item;
                    result.context.isProfileBusy = false;
                }
            }
        };
        this.profileService.get(result);
    }
    makeProfileFree() {
        this.isProfileBusy = false;
        console.log(this.isProfileBusy);
    }
}
