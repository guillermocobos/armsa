import { catchError, map } from 'rxjs/operators';
import { ActividadInscriptaModel } from '../../models/actividad-inscripta.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../util';
import { throwError } from 'rxjs';
import { OpemTributoConceptoModel } from '../../models/opem-tributo-concepto.model';
@Injectable()
export class LibreDeudasService {

  apiUrl = environment.API_SERVER;

  constructor(private http: HttpClient, private util: Util) {
  }

  getTiposImponibles(tipoCertificado) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/libre-deudas/obtener-tipos-imponibles`, {tipoCertificado})
      .pipe(
        map((response: any) => {
          return response.map((tipoImponible) => this.util.toLowercaseAttributes(tipoImponible, true));
        }),
        catchError(this.handleError)
      );
  }

  getImponibles(tipoImponible) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/libre-deudas/obtener-imponibles`, {tipoImponible})
      .pipe(
        map((response: any) => {
          return response.map((imponible) => this.util.toLowercaseAttributes(imponible, true));
        }),
        catchError(this.handleError)
      );
  }

  tieneDeuda(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/libre-deudas/tiene-deuda`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  generarCertificado(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/libre-deudas/insertar-certificado`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  listarCertificados() {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/libre-deudas/listar-certificados`)
      .pipe(
        map((response: any) => {
          return response.map((certificado) => {
            return this.util.toLowercaseAttributes(certificado, true);
          });
        }),
        catchError(this.handleError)
      );
  }

  imprimirCertificado(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/libre-deudas/imprimir-certificado`, body, {responseType: 'blob'})
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
}
