import { OrdersComponent } from './../feature/order/orders/orders.component';
import { ItemsInCategoryComponent } from './../feature/item/itemsincategory/itemsincategory.component';
import { AuctionDetailComponent } from './../feature/auction/detail/auctiondetail.component';
import { SearchHeaderComponent } from './../feature/navigations/searchheader/searchheader.component';
import { CreateAuctionsComponent } from './../feature/auction/create/createauctions.component';
import { AuctionsComponent } from './../feature/auction/auctions/auctions.component';
import { CheckoutReviewComponent } from './../feature/checkout/review/checkoutreview.component';
import { CheckoutPaymentComponent } from './../feature/checkout/paymentmethod/checkoutpayment.component';
import { CheckoutShippingComponent } from './../feature/checkout/shippingmethod/checkoutshipping.component';
import { CheckoutAddressComponent } from './../feature/checkout/address/checkoutaddress.component';
import { CartComponent } from './../feature/cart/cart.component';
import { WhishlistComponent } from './../feature/wishlist/wishlist.component';
import { ItemDetailComponent } from './../feature/item/itemdetail/itemdetail.component';
import { StoriesComponent } from './../feature/story/stories/stories.component';
import { StoryComponent } from './../feature/story/story/story.component';
import { ArticleComponent } from './../feature/article/article/article.component';
import { ArticlesComponent } from './../feature/article/articles/articles.component';
import { SearchResultComponent } from './../feature/searchresult/searchresult.component';
import { HomeHeaderComponent } from './../feature/navigations/homeheader/homeheader.component';
import { Routes } from '@angular/router';
import { HomeComponent } from '../feature/home/home.component';
import { LoginComponent } from '../feature/login/login.component';

import { RouteAuth } from '../utility/route.auth';
import { RegisterComponent } from '../feature/register/register.component';
import { HeaderComponent } from '../feature/navigations/header/header.component';

import { AddItemComponent } from '../feature/item/add/additem.component';
import { EditItemComponent } from '../feature/item/edit/edititem.component';
import { FooterComponent } from '../feature/footer/footer.component';
import { EditItemImageComponent } from '../feature/item/editimage/edititemimage.component';
import { EditItemInfoComponent } from '../feature/item/edititeminfo/edititeminfo.component';
import { EditItemDiscountComponent } from '../feature/item/edititemdiscount/edititemdiscount.component';
import { ItemsComponent } from '../feature/item/items/items.component';
import { BusinessInfoComponent } from '../feature/business/businessinfo/businessinfo.component';
import { ActivateBusinessComponent } from '../feature/business/activatebusiness/activatebusiness.component';
import { BusinessEditComponent } from '../feature/business/businessedit/businessedit.component';
import { BusinessAddressEditComponent } from '../feature/business/businessaddress/businessaddress.component';
import { ProfileInfoComponent } from '../feature/profile/profileinfo/profileinfo.component';
import { ProfileEditComponent } from '../feature/profile/profileedit/profileedit.component';
import { AddressInfoComponent } from '../feature/address/addressinfo/addressinfo.component';
import { AddressesComponent } from '../feature/address/addresses/addresses.component';
import { EditAddressComponent } from '../feature/address/editaddress/editaddress.component';



// export const routes: Routes = [
//   { path: '', component: LoginComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'profiles', component: ProfileComponent, canActivate: [RouteAuth] },
//   { path: 'home', component: HomeComponent, canActivate: [RouteAuth] },
//   { path: 'register', component: RegisterComponent },
//   { path: '**', component: LoginComponent },
// ];

export const routes: Routes = [
  {
    path: 'authentication', children: [
      // { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: '', children: [
      { path: '', component: HomeComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: HomeHeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'cart', children: [
      { path: '', component: CartComponent, canActivate: [RouteAuth] },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'item', children: [
      { path: ':id', component: ItemDetailComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'search', children: [
      { path: '', component: SearchResultComponent },
      { path: 'category/:id', component: ItemsInCategoryComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: SearchHeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'auctions', children: [
      { path: '', component: AuctionsComponent },
      { path: 'create', component: CreateAuctionsComponent, canActivate: [RouteAuth] },
      { path: ':id', component: AuctionDetailComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'checkout', children: [
      { path: '', redirectTo: 'address', pathMatch: 'full', canActivate: [RouteAuth] },
      { path: 'address', component: CheckoutAddressComponent, canActivate: [RouteAuth] },
      { path: 'shipping', component: CheckoutShippingComponent, canActivate: [RouteAuth] },
      { path: 'payment', component: CheckoutPaymentComponent, canActivate: [RouteAuth] },
      { path: 'review', component: CheckoutReviewComponent, canActivate: [RouteAuth] },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'articles', children: [
      { path: '', component: ArticlesComponent },
      { path: ':id', component: ArticleComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'news', children: [
      { path: '', component: StoriesComponent },
      { path: ':id', component: StoryComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  },
  {
    path: 'profile', children: [
      // { path: '', component: HomeComponent, canActivate: [RouteAuth] },
      { path: '', component: ProfileInfoComponent, canActivate: [RouteAuth] },
      { path: 'wishlist', component: WhishlistComponent, canActivate: [RouteAuth] },
      { path: 'edit', component: ProfileEditComponent, canActivate: [RouteAuth] },
      { path: 'business/edit', component: BusinessEditComponent, canActivate: [RouteAuth] },
      { path: 'business/manage', component: BusinessInfoComponent, canActivate: [RouteAuth] },
      { path: 'business/address/edit', component: BusinessAddressEditComponent, canActivate: [RouteAuth] },
      { path: 'business/manage/item/add', component: AddItemComponent, canActivate: [RouteAuth] },
      { path: 'business/manage/items', component: ItemsComponent, canActivate: [RouteAuth] },
      {
        path: 'business/manage/item/edit/:id', component: EditItemComponent, canActivate: [RouteAuth],
        children: [
          {
            path: '',
            component: EditItemInfoComponent,
            canActivate: [RouteAuth]
          },
          {
            path: 'image',
            component: EditItemImageComponent,
            canActivate: [RouteAuth]
          },
          {
            path: 'discount',
            component: EditItemDiscountComponent,
            canActivate: [RouteAuth]
          }
        ]
      },
      { path: 'activatebusiness', component: ActivateBusinessComponent, canActivate: [RouteAuth] },
      { path: 'address', component: AddressInfoComponent, canActivate: [RouteAuth] },
      { path: 'addresses', component: AddressesComponent, canActivate: [RouteAuth] },
      { path: 'addresses/edit/:id', component: EditAddressComponent, canActivate: [RouteAuth] },
      { path: 'orders', component: OrdersComponent, canActivate: [RouteAuth] },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: HeaderComponent, outlet: 'header' }
    ]
  }
  //
  // {
  //   path: 'home', children: [
  //     { path: 'address', component: AddressComponent, canActivate: [RouteAuth] },
  //     { path: '', component: FooterComponent, outlet: 'footer' },
  //     { path: '', component: HeaderComponent, outlet: 'header' },
  //   ]
  // }
];
