import { CategoryService } from './../../../service/category.service';
import { CartService } from './../../../service/cart.service';
import { Profile } from './../../../model/profile';
import { ProfileService } from './../../../service/profile.service';
import { AuthenticationService } from './../../../service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $: any;

@Component({
    selector: 'app-searchheader-component',
    templateUrl: './searchheader.component.html',
    styleUrls: ['./searchheader.component.css']
})
export class SearchHeaderComponent implements OnInit {
    selected: string;
    isLoggedIn = false;
    profile: Profile;
    itemsInCart: any;
    isHome = false;
    categories = [];

    test: any;
    constructor(public http: Http, private router: Router,
        private authService: AuthenticationService, private profileService: ProfileService,
        private cartService: CartService, private categoryService: CategoryService) {
        const context = this;
        this.cartService.getObservableCart().subscribe(c => {
            this.updateCart(c);
        });
        this.cartService.update();
    }


    ngOnInit() {
        const interested = {
            context: this,
            satisfy(e) {
                console.log(e);
                interested.context.categories = e;
                for (const i of e) {
                    $('.categorySelect').append(`<option value="${i.id}">${i.name}</option>`);
                }
                $('.select-drop').selectbox();

            }
        };
        this.categoryService.getAllItemCategories(interested);

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

        // const result2 = {
        //     context: this,
        //     success(e) {
        //         console.log(e);
        //     },
        //     error(e) {
        //         console.log(e);
        //     }
        // };

    }

    observableSource = (keyword: any): Observable<any[]> => {
        const url: string =
            'http://localhost:54434/api/home/suggestion/' + keyword;
        if (keyword) {
            return this.http.get(url).map(res => {
                const json = res.json();
                return json.results;
            });
        } else {
            return Observable.of([]);
        }
    }

    search() {
        this.router.navigate(['/search'], { queryParams: { q: this.selected } });
        this.categoryService.getAllBusinessCategories({
            satisfy: function (e) {
                console.log(e);
            }
        });
        console.log(this.test);
    }

    keypressed(e) {
        if (e.keyCode === 13 && this.selected !== '') {
            this.search();
        }
    }

    updateCart(e) {
        this.itemsInCart = e;
    }
}
