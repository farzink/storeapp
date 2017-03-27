import { Routes } from '@angular/router';
import { HomeComponent } from '../feature/home/home.component';
import { LoginComponent } from '../feature/login/login.component';
import { ProfileComponent } from '../feature/profile/profile.component';
import { RouteAuth } from '../utility/route.auth';
import { RegisterComponent } from '../feature/register/register.component';

export const routes: Routes = [
  { path: '',       component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'profiles', component: ProfileComponent, canActivate: [RouteAuth] },
  { path: 'home',   component: HomeComponent, canActivate: [RouteAuth] },
  { path: 'register', component: RegisterComponent },
  { path: '**',     component: LoginComponent },
];