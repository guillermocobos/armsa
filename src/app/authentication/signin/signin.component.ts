import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';

declare const jQuery: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  public formChangePassword: FormGroup;
  public errorLogin;
  submitted = false;
  loading = false;
  authSubscription: Subscription;
  cambiarPassword = false;
  public errorCambiarPassword;
  returnUrl;


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    console.log("Entra a ngoninit");
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.returnUrl = params.returnUrl ? params.returnUrl : '';
      });

    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    console.log("Sale de ngoninit");
  }

  get f() { return this.form.controls; }
  get fn() { return this.formChangePassword.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.authSubscription = this.authenticationService.login(this.form.value)
        .subscribe((data: any) => {
          this.errorLogin = undefined;
          this.loading = false;
          if (!data.signin) {
            this.cambiarPassword = true;

            this.formChangePassword = this.formBuilder.group({
              password_actual: ['', [Validators.required]],
              nuevo_password: ['', [Validators.required]],
              repite_password: ['', [Validators.required, this.passwordMatch]]
            });
          } else {
            if (this.returnUrl) {
              this.router.navigate([this.returnUrl]);
            } else {
              this.router.navigate(['/clave-fiscal/inicio']);
            }
          }
        }, (err) => {
          if (err.status === 401) {
            this.errorLogin = err.error.message;
          }
          this.loading = false;
        });
    }
  }

  onSubmitCambiarPassword() {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.authSubscription = this.authenticationService.cambiarPassword(this.formChangePassword.value, this.form.get('usuario').value)
        .subscribe((data: any) => {
          this.errorLogin = undefined;
          this.loading = false;
          this.router.navigate(['/clave-fiscal/inicio']);
        }, (err) => {
          if (err.status === 401) {
            this.errorCambiarPassword = err.error.message;
          }
          this.loading = false;
        });
    }
  }

  passwordMatch(control: AbstractControl) {
    const paswd = control.root.get('nuevo_password');
    if (paswd && control.value !== paswd.value) {
      return {
        passwordMatch: true
      };
    }
    return null;
  }
}
