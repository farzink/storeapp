import { AuthenticationService } from './../../../service/authentication.service';
import { ProfileService } from './../../../service/profile.service';
import { Profile } from './../../../model/profile';
import { CartService } from './../../../service/cart.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isLoggedIn = false;
    profile: Profile;
    itemsInCart: any;
    constructor(private authService: AuthenticationService, private profileService: ProfileService, private cartService: CartService) {
        const context = this;
        this.cartService.getObservableCart().subscribe(c => {
            this.updateCart(c);
        });
        this.cartService.update();
    }



    updateCart(e) {
        this.itemsInCart = e;
    }

    ngOnInit(): void {
        const result = {
            context: this,
            success(e) {
                result.context.profile = e;
            }
        };
        this.profileService.getUserData(result);

        if (!this.authService.isTokenExpired()) {
            this.isLoggedIn = true;
        }
    }
}
