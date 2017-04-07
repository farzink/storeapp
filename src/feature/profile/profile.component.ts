import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Profile } from '../../model/profile';
import { ProfileService } from '../../service/profile.service';



@Component({
    selector: 'profile-component',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    ngOnInit(): void {
        this.getProfile();
    }

    private profile: Profile;
    constructor(private profileService: ProfileService) {
    }
    getProfile() {
        var result = {
            context: this,
            success(e) {
                if (e.statusCode == 200)
                    result.context.profile = e.item;                    
            }
        };
        this.profileService.get(result);
    }
    // setProfile(e){
    //     this.firstName=e.firstName;
    // }
}