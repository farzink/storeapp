import { Routes } from '@angular/router';
import { HomeComponent } from '../feature/home/home.component';
import { LoginComponent } from '../feature/login/login.component';
//import { Signup } from './signup';
import { RouteAuth } from '../utility/route.auth';

export const routes: Routes = [
  { path: '',       component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  //{ path: 'signup', component: Signup },
  { path: 'home',   component: HomeComponent, canActivate: [RouteAuth] },
  //{ path: '**',     component: Login },
];