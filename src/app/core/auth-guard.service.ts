import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { UserProfileService } from './user-profile.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private userProfileService: UserProfileService, private router: Router) {}

  canLoad(route: Route) {
    if (this.userProfileService.isLoggedIn) {
      return true;
    }
    let url = `${route.path}`;
    console.log('url: ' + url);
    this.router.navigate(['/login'], { queryParams: { redirectTo: url } });
    return this.userProfileService.isLoggedIn;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {    
    if (this.userProfileService.isLoggedIn) {
      return true;
    }
    console.log('state.url: ' + state.url);
    this.router.navigate(['/login'], { queryParams: { redirectTo: state.url } });

    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}