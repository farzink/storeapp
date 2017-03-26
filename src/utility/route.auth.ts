import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class RouteAuth implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    // if (tokenNotExpired()) {
    //   return true;
    // }

    //this.router.navigate(['/login']);
    return true;
  }
}
