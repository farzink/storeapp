import { Profile } from './../../../model/profile';
import { ProfileService } from './../../../service/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-orders-component',
    templateUrl: 'orders.component.html'
})

export class OrdersComponent implements OnInit {
    constructor(private profileService: ProfileService) { }
    profile: Profile;
    ngOnInit() {
        this.getProfile();
     }


    getProfile() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    console.log(e);
                    result.context.profile = e.item;
                }
            }
        };
        this.profileService.get(result);
    }
}