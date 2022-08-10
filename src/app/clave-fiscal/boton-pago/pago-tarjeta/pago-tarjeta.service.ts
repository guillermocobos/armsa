import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../../util';
import { throwError } from 'rxjs';

@Injectable()
export class PagoTarjetaService {

  apiUrl = environment.API_SERVER;

  constructor(private http: HttpClient, private util: Util) {
  }

  generarDetallesVtos(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/pagos-tarjetas/generar-detalles-vtos`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  generarPago(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/pagos-tarjetas/generar-pago-tarjeta`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  nuevoImporte(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/nuevo-importe`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  registrarPago(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/pagos-tarjetas/registrar-pago-tarjeta`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimirComprobantePagoTarjeta(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/pagos-tarjetas/imprimir-constancia`, body, {responseType: 'blob'})
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
