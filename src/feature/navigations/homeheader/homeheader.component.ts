import { placeholderImage } from './../../../utility/link';
import { CategoryService } from './../../../service/category.service';
import { CartService } from './../../../service/cart.service';
import { Profile } from './../../../model/profile';
import { ProfileService } from './../../../service/profile.service';
import { AuthenticationService } from './../../../service/authentication.service';
import { Router, ActivatedRoute, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $: any;



@Component({
    selector: 'app-homeheader-component',
    templateUrl: './homeheader.component.html',
    styleUrls: ['./homeheader.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeHeaderComponent implements OnInit {
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
        private cartService: CartService, private categoryService: CategoryService, private authenticationService: AuthenticationService) {
        const context = this;
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.jqueryInit();
            }
        });

        this.cartService.getObservableCart().subscribe(c => {
            if (!authenticationService.isTokenExpired()) {
                this.updateCart(c);
            }
        });
        if (!authenticationService.isTokenExpired()) {
            this.cartService.update();
        }
    }

    ngOnInit() {
        $('.select-drop').selectbox();
        const interested = {
            context: this,
            satisfy(e) {
                console.log(e);
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
        const temp: any = document.getElementsByClassName('categorySelect')[0];
        const selectedCategory = temp.value;
        this.router.navigate(['/search'], { queryParams: { q: this.selected, ci: selectedCategory } });
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
        console.log(e);
        this.itemsInCart = e;
    }

    logout() {
        this.authService.removeToken();
        this.isLoggedIn = false;
        this.profile = null;
        // this.router.navigate(['/profile/addresses']);
    }

    jqueryInit() {
        $('.bannerV4 .fullscreenbanner').revolution({
            delay: 5000,
            startwidth: 835,
            startheight: 470,
            fullWidth: "off",
            fullScreen: "off",
            hideCaptionAtLimit: "",
            dottedOverlay: "twoxtwo",
            navigationStyle: "preview4",
            fullScreenOffsetContainer: "",
            hideTimerBar: "on",
            onHoverStop: "on",
        });
        const owl = $('.owl-carousel.categorySlider');
        owl.owlCarousel({
            loop: true,
            margin: 28,
            autoplay: false,
            nav: true,
            moveSlides: 1,
            dots: false,
            smartSpeed: 1000,
            responsive: {
                320: {
                    items: 1
                },
                768: {
                    items: 1
                },
                992: {
                    items: 1
                }
            }
        });

        // const header_area = $('.header');
        // const main_area = header_area.children('.navbar');
        // const navigation = main_area.find('.navbar-collapse');
        // const original = {
        //     nav_top: navigation.css('margin-top')
        // };

        // if (main_area.hasClass('bb-fixed-header') && ($(this).scrollTop() == 0 || $(this).width() < 750)) {
        //     // console.log('this opens the nav');
        //     main_area.removeClass('bb-fixed-header').appendTo(header_area);
        //     navigation.animate({
        //         'margin-top': original.nav_top
        //     }, {
        //             duration: 100,
        //             queue: false,
        //             complete: function () {
        //                 header_area.css('height', 'auto');
        //             }
        //         });
        // }


    }
}
