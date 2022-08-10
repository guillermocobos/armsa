import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class AuthenticationService {

  apiUrl = environment.API_SERVER;
  public updatedUser = new BehaviorSubject<any>(this.getSessionUser());
  updatedUserObs = this.updatedUser.asObservable();
  ip;

  constructor(private http: HttpClient) {
  }

  login(body) {
    return this
      .http
      .post(`${this.apiUrl}/auth/login`, body)
      .pipe(
        map((data: any) => {
          if (data.signin) {
            localStorage.setItem('armsa_token', data.token);
            localStorage.setItem('armsa_user_id', data.user_id);
            localStorage.setItem('armsa_exp', data.exp);
            localStorage.setItem('armsa_user', body.usuario);
            localStorage.setItem('armsa_contribuyente', JSON.stringify(data.contribuyente));
            this.updateSessionUser(body.usuario);
          }
          return data;
        }),
        catchError(this.handleError)
      );
  }

  cambiarPassword(body: any, usuario) {
    body.usuario = usuario;
    return this
      .http
      .post(`${this.apiUrl}/auth/cambiar-password`, body)
      .pipe(
        map((data: any) => {
          if (data.signin) {
            localStorage.setItem('armsa_token', data.token);
            localStorage.setItem('armsa_user_id', data.user_id);
            localStorage.setItem('armsa_exp', data.exp);
            localStorage.setItem('armsa_user', body.usuario);
            localStorage.setItem('armsa_contribuyente', JSON.stringify(data.contribuyente));
            this.updateSessionUser(body.usuario);
          }
          return data;
        }),
        catchError(this.handleError)
      );
  }

  isLoggedIn() {
    const token = localStorage.getItem('armsa_token');
    const exp = localStorage.getItem('armsa_exp');
    const now = moment().format('X');
    if (token !== null) {
      if (Number(exp) <= Number(now)) {
        this.logout();
        this.updateSessionUser();
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
  }

  descargarInstructivoMobile(){
    return this
      .http
      .get(`${this.apiUrl}/contribuyentes/descarga-instructivo-mobile`, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getToken() {
    return localStorage.getItem('armsa_token');
  }

  getSessionUser() {
    return localStorage.getItem('armsa_user');
  }

  getContribuyenteSesion() {
    return JSON.parse(localStorage.getItem('armsa_contribuyente'));
  }

  getSessionUserId() {
    return localStorage.getItem('armsa_user_id') ;
  }

  updateSessionUser(sessionUser?: any) {
    if (sessionUser) {
      this.updatedUser.next(sessionUser);
      localStorage.setItem('armsa_user', JSON.stringify(sessionUser));
    } else {
      this.updatedUser.next(false);
    }
    return true;
  }

  checkIp() {
    return this.http.get('https://jsonip.com')
      .subscribe( (data: any) => {
        this.ip = data.ip;
      });
  }
  getIp() {
    return this.ip;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(error);
    return throwError(error);
  }
}
