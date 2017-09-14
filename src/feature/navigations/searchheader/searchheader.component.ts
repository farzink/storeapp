import { placeholderImage, basePath } from './../../../utility/link';
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
    placeholderImage = placeholderImage;

    test: any;
    constructor(public http: Http, private router: Router,
        private authService: AuthenticationService, private profileService: ProfileService,
        private cartService: CartService, private categoryService: CategoryService) {
        const context = this;
        if (!this.authService.isTokenExpired()) {
            this.cartService.getObservableCart().subscribe(c => {
                this.updateCart(c);
            });
            this.cartService.update();
        }
    }


    ngOnInit() {
        $('.select-drop').selectbox();
        const interested = {
            context: this,
            satisfy(e) {
                interested.context.categories = e;
                $('.categorySelect').empty();
                for (const i of e) {
                    $('.categorySelect').append(`<option value="${i.id}">${i.name}</option>`);
                }
                $('.select-drop').selectbox('detach');
                $('.select-drop').selectbox('attach');
            }
        };
        this.categoryService.getAllItemCategories(interested);


        if (!this.authService.isTokenExpired()) {
            const result = {
                context: this,
                success(e) {
                    result.context.profile = e;
                }
            };
            this.profileService.getUserData(result);
            this.isLoggedIn = true;
        }
    }

    observableSource = (keyword: any): Observable<any[]> => {
        const url = `${basePath}home/suggestion/${keyword}`;
        if (keyword) {
            return this.http.get(url).map(res => {
                const json = res.json();
                return json.results;
            });
        } else {
            return Observable.of([]);
        }
    }

    // search() {



    //     this.router.navigate(['/search'], { queryParams: { q: this.selected } });
    //     this.categoryService.getAllBusinessCategories({
    //         satisfy: function (e) {

    //         }
    //     });

    // }

    search() {
        const temp: any = document.getElementsByClassName('categorySelect')[0];
        const selectedCategory = temp.value;
        this.router.navigate(['/search'], { queryParams: { q: this.selected, ci: selectedCategory } });
        this.categoryService.getAllBusinessCategories({
            satisfy: function (e) {
            }
        });
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
