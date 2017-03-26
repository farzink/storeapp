import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { ProfileService } from '../../service/profile-service';



@Component({
    selector: 'profile-component',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {    
    firstName: String;
    constructor(private profileService: ProfileService){        
    }    
    getProfile(){               
        var result = {
            context: this,
            success(e){
                if(e.statusCode==200)
                result.context.setProfile(e.item);
            }
        };        
        this.profileService.getById(1, result);        
    }
    setProfile(e){
        this.firstName=e.firstName;
    }
}