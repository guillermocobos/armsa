import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Util } from '../../util';

@Injectable({
  providedIn: 'root'
})
export class RetencionesPercepcionesService {

  apiUrl = environment.API_SERVER;
  constructor(private http: HttpClient, private util: Util) {  }

  obtenerPadronesPersona(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/retenciones-percepciones/obtener-padrones`, body)
      .pipe(
        map((padrones: Array<any>) => {
            return padrones.map((padron) => {
                return this.util.toLowercaseAttributes(padron, true);
            });
        }),
        catchError((error) => throwError(error))
      );
  }

  obtenerPercepciones(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/retenciones-percepciones/obtener-percepciones`, body)
      .pipe(
        map((percepciones: Array<any>) => {
            return percepciones.map((percepcion) => {
                return this.util.toLowercaseAttributes(percepcion, true);
            });
        }),
        catchError((error) => throwError(error))
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Client Error: ${error.error.  message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(error);
    return throwError(error);
  }

}
