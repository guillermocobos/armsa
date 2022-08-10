import {
  Component, OnDestroy, OnInit
} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../authentication/signin/authentication.service";
import {Router} from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html'
})
export class LeftSidebarComponent implements OnDestroy {
  user;
  userSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.userSubscription = this.authenticationService.updatedUserObs.subscribe((user) => {
      this.user = this.authenticationService.isLoggedIn() ? user.replace(/\"/g, '') : undefined;
      //$.MyAdmin.leftSideBar.activate();
    });
  }

  logout() {
    this.authenticationService.logout();
    this.authenticationService.updateSessionUser(null);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
