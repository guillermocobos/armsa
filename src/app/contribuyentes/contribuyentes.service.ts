import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ContribuyentesService {

  apiUrl = environment.API_SERVER;

  constructor(private http: HttpClient) {
  }

  calcularIntereses(body) {
  body.impuesto = '0008'; // body.impuesto.slice(0, -1);
    return this
      .http
      .post(`${this.apiUrl}/contribuyentes/calculo-intereses`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  generarConstanciaInscripcion(personaId: string) {
    const body = {
      personaId: personaId.toString()
    };
    return this
      .http
      .post(`${this.apiUrl}/contribuyentes/constancia-inscripcion/generar`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  validarConstanciaInscripcion(cuit) {
    const body = {
      cuit
    };
    return this
      .http
      .post(`${this.apiUrl}/contribuyentes/constancia-inscripcion/validar`, body)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
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

  descargarSipret() {
    return this
      .http
      .get(`${this.apiUrl}/contribuyentes/descarga-sipret`, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
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

  vencimientosImpuestos(body) {
    return this
      .http
      .post(`${this.apiUrl}/contribuyentes/vencimientos-impuestos`, body)
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  descargarAACC(){
    return this
      .http
      .get(`${this.apiUrl}/contribuyentes/descarga-aacc`, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  descargarAutomotor(){
    return this
      .http
      .get(`${this.apiUrl}/contribuyentes/descarga-automotor`, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  descargarInmobiliario(){
    return this
      .http
      .get(`${this.apiUrl}/contribuyentes/descarga-inmobiliario`, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
}
