import { AuctionDetailComponent } from './../feature/auction/detail/auctiondetail.component';
import { SearchHeaderComponent } from './../feature/navigations/searchheader/searchheader.component';
import { AuctionRepository } from './../repository/auction.repository';
import { AuctionService } from './../service/auction.service';
import { AuctionsComponent } from './../feature/auction/auctions/auctions.component';
import { CreateAuctionsComponent } from './../feature/auction/create/createauctions.component';
import { CountdownComponent } from './../sharedcomponent/countdown/countdown.component';
import { CategoryRepository } from './../repository/category.repository';
import { CheckoutShippingComponent } from './../feature/checkout/shippingmethod/checkoutshipping.component';
import { CheckoutReviewComponent } from './../feature/checkout/review/checkoutreview.component';
import { CheckoutPaymentComponent } from './../feature/checkout/paymentmethod/checkoutpayment.component';
import { CheckoutAddressComponent } from './../feature/checkout/address/checkoutaddress.component';
import { OrderRepository } from './../repository/order.repository';
import { CartService } from './../service/cart.service';
import { CartComponent } from './../feature/cart/cart.component';
import { WhishlistComponent } from './../feature/wishlist/wishlist.component';
import { ItemDetailComponent } from './../feature/item/itemdetail/itemdetail.component';
import { StoryService } from './../service/story.service';
import { StoryRepository } from './../repository/story.repository';
import { StoriesComponent } from './../feature/story/stories/stories.component';
import { StoryComponent } from './../feature/story/story/story.component';
import { PaginationComponent } from './../sharedcomponent/pagination/pagination.component';
import { TruncatePipe } from './../utility/pipe/truncate.pipe';
import { ArticlesComponent } from './../feature/article/articles/articles.component';
import { ArticleComponent } from './../feature/article/article/article.component';
import { HomeContentComponent } from './../feature/homecontent/homecontent.component';
import { HomeBannerComponent } from './../feature/homebanner/homebanner.component';
import { SearchResultComponent } from './../feature/searchresult/searchresult.component';
import { HomeHeaderComponent } from './../feature/navigations/homeheader/homeheader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Headers } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AlertModule } from 'ngx-bootstrap';
import { RouteAuth } from '../utility/route.auth';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { StarRatingModule } from 'angular-star-rating';

// Component
import { HomeComponent } from '../feature/home/home.component';
import { LoginComponent } from '../feature/login/login.component';

import { AppComponent } from './app.component';
import { HttpHelper } from '../service/http.helper';
import { AuthenticationService } from '../service/authentication.service';
import { ProfileRepository } from '../repository/profile.repository';
import { ProfileService } from '../service/profile.service';
import { ICoreService } from '../service/icore.service';
import { IRepository } from '../repository/irepository';

import { ObservableHelper } from '../utility/observable-helper';
import { RegisterComponent } from '../feature/register/register.component';
import { FooterComponent } from '../feature/footer/footer.component';
import { HeaderComponent } from '../feature/navigations/header/header.component';
import { AddressRepository } from '../repository/address.repository';
import { AddressService } from '../service/address.service';
import { ArticleRepository } from './../repository/article.repository';
import { ArticleService } from './../service/article.service';



import { WaitComponent } from '../sharedcomponent/wait/wait.component';
import { ModalComponent } from '../sharedcomponent/modal/modal.component';
import { AddItemComponent } from '../feature/item/add/additem.component';
import { ItemRepository } from '../repository/item.repository';
import { ItemService } from '../service/item.service';
import { CategoryService } from '../service/category.service';
import { EditItemComponent } from '../feature/item/edit/edititem.component';
import { EditItemImageComponent } from '../feature/item/editimage/edititemimage.component';
import { EditItemInfoComponent } from '../feature/item/edititeminfo/edititeminfo.component';
import { EditItemDiscountComponent } from '../feature/item/edititemdiscount/edititemdiscount.component';


import { NgxGalleryModule } from 'ngx-gallery';
import { ImageComponent } from '../feature/image/image.component';
import { ItemsComponent } from '../feature/item/items/items.component';
import { ActivateBusinessComponent } from '../feature/business/activatebusiness/activatebusiness.component';
import { BusinessInfoComponent } from '../feature/business/businessinfo/businessinfo.component';
import { BusinessEditComponent } from '../feature/business/businessedit/businessedit.component';
import { BusinessAddressEditComponent } from '../feature/business/businessaddress/businessaddress.component';
import { ProfileInfoComponent } from '../feature/profile/profileinfo/profileinfo.component';
import { ProfileEditComponent } from '../feature/profile/profileedit/profileedit.component';
import { AddressInfoComponent } from '../feature/address/addressinfo/addressinfo.component';
import { AddressesComponent } from '../feature/address/addresses/addresses.component';
import { EditAddressComponent } from '../feature/address/editaddress/editaddress.component';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileEditComponent,
    LoginComponent,
    ProfileInfoComponent,
    RegisterComponent,
    HeaderComponent,
    BusinessAddressEditComponent,
    FooterComponent,
    AddressInfoComponent,
    WaitComponent,
    CountdownComponent,
    PaginationComponent,
    AddressesComponent,
    BusinessEditComponent,
    EditAddressComponent,
    ActivateBusinessComponent,
    BusinessInfoComponent,
    AddItemComponent,
    ItemsComponent,
    EditItemComponent,
    EditItemImageComponent,
    EditItemInfoComponent,
    EditItemDiscountComponent,
    ImageComponent,
    HomeHeaderComponent,
    SearchHeaderComponent,
    HomeBannerComponent,
    SearchResultComponent,
    HomeContentComponent,
    ArticleComponent,
    ArticlesComponent,
    TruncatePipe,
    StoryComponent,
    StoriesComponent,
    ItemDetailComponent,
    WhishlistComponent,
    CartComponent,
    CheckoutAddressComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutShippingComponent,
    CreateAuctionsComponent,
    AuctionsComponent,
    AuctionDetailComponent,
    ModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {}),
    NgxGalleryModule,
    SimpleNotificationsModule.forRoot(),
    NguiAutoCompleteModule,
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
    DateTimePickerModule,
    BootstrapModalModule,
    StarRatingModule
  ],
  providers: [
    RouteAuth,
    HttpHelper,
    AuthenticationService,
    ProfileRepository,
    ProfileService,
    ObservableHelper,
    AddressRepository,
    AddressService,
    ItemRepository,
    ItemService,
    ArticleService,
    ArticleRepository,
    StoryRepository,
    StoryService,
    CartService,
    OrderRepository,
    CategoryRepository,
    CategoryService,
    AuctionRepository,
    AuctionService
  ],
  entryComponents: [
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
