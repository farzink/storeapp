import { Component, OnInit, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Profile } from '../../../model/profile';
import { ProfileService } from '../../../service/profile.service';


@Component({
    selector: 'businessinfo-component',
    templateUrl: './businessinfo.component.html',
    styleUrls: ['./businessinfo.component.css']
})
export class BusinessInfoComponent implements OnInit {
    isProfileBusy = true;
    businessName = '';
    businessTaxNumber = 0;
    private profile: Profile;
    ngOnInit(): void {
        this.getBusinessInfo();
    }
    constructor(private profileService: ProfileService) {
    }

    getBusinessInfo() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.businessName = e.item.businessName;
                    result.context.businessTaxNumber = e.item.taxIdentification;
                }
            },
            error(e) {
                console.log(e);
            }
        };
        this.profileService.getBusiness(result);
    }

}
