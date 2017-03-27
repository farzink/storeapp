import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';


@Injectable()
export class RouteAuth implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate() {
    if (!this.authService.isTokenExpired()) {
      return true;
    }
    this.router.navigate(['/authentication/login']);
    return true;
  }
}
