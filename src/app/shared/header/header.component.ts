import {
  Component, OnDestroy, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/signin/authentication.service';
import * as FileSaver from 'file-saver';
import {NoticiasService} from '../../noticias/noticias.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  user;
  userSubscription: Subscription;
  loading = false;


  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.userSubscription = this.authenticationService.updatedUserObs.subscribe((user) => {
       this.user = this.authenticationService.isLoggedIn() ? user.replace(/\"/g, '') : undefined;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.authenticationService.updateSessionUser(null);
    this.router.navigate(['/']);
  }

  descargarInstructivo(){
    this.loading = true;
    this.authenticationService.descargarInstructivoMobile()
      .subscribe((response: any) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, 'InstructivoAccesoDirectoARMSaMobile.pdf');
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });

   }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
