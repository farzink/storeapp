import { Routes } from '@angular/router';
import { HomeComponent } from '../feature/home/home.component';
import { LoginComponent } from '../feature/login/login.component';
import { ProfileComponent } from '../feature/profile/profile.component';
import { RouteAuth } from '../utility/route.auth';
import { RegisterComponent } from '../feature/register/register.component';
import { FooterComponent } from './../feature/footer/footer.component';
import { HeaderComponent } from '../feature/header/header.component';
import { AddressComponent } from '../feature/address/address.component';
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
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  {
    path: '', children: [
      { path: '', component: HomeComponent, canActivate: [RouteAuth] },
      { path: 'home', component: ProfileComponent, canActivate: [RouteAuth] },
      { path: 'home/address', component: AddressComponent, canActivate: [RouteAuth] },
      { path: '', component: FooterComponent, outlet: 'footer' },
      { path: '', component: HeaderComponent, outlet: 'header' },
    ]
  }//,
  // {
  //   path: 'home', children: [      
  //     { path: 'address', component: AddressComponent, canActivate: [RouteAuth] },
  //     { path: '', component: FooterComponent, outlet: 'footer' },
  //     { path: '', component: HeaderComponent, outlet: 'header' },
  //   ]
  // }
];