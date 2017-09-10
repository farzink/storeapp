import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';


@Injectable()
export class RouteAuth implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService, ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
