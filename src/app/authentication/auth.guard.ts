import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd, Event, UrlSegment} from '@angular/router';
import { AuthenticationService } from './signin/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        // not logged in so redirect to auth page with the return url
        console.log("canActivate");
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
        return false;


    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authService.isLoggedIn()) {
          return true;
        }
      console.log("canActivateChild");
        // not logged in so redirect to auth page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    parseRoute(node: ActivatedRouteSnapshot): string {
        if (node.firstChild) {
            return this.parseRoute(node.firstChild);
        }
        if (node.data.name) {
            return node.data.name;
        }

    }

}
