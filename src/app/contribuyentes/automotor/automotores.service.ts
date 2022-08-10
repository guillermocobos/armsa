import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Util } from '../../util';


@Injectable()
export class AutomotoresService {

  apiUrl = environment.API_SERVER;

  constructor(private http: HttpClient, private util: Util) {
  }

  loginAuto(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/login-auto`, body)
      .pipe(
        map((data: any) => {
          return {...data,
            deudaAutos: data.deudaAutos.map((estadoDeuda) => {
              return this.util.toLowercaseAttributes(estadoDeuda, true);
            }),
            datosContribuyente: this.util.toLowercaseAttributes(data.datosContribuyente, true)
          };
        }),
        catchError((error) => throwError(error))
      );
  }

  loginMultasAuto(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/login-multas`, body)
      .pipe(
        map((data: any) => {
          return {...data,
            multasAuto: data.multasAuto.map((multa) => {
              return this.util.toLowercaseAttributes(multa, true);
            }),
            datosContribuyente: this.util.toLowercaseAttributes(data.datosContribuyente, true)
          };
        }),
        catchError((error) => throwError(error))
      );
  }

  historialMultasAuto(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/historial-multas-auto`, body)
      .pipe(
        map((data: any) => {
          return {...data,
            historialMultas: data.historialMultas.map((historial) => {
              return this.util.toLowercaseAttributes(historial, true);
            }),
            datosContribuyente: this.util.toLowercaseAttributes(data.datosContribuyente, true)
          };
        }),
        catchError((error) => throwError(error))
      );
  }

  estadoCuentaAuto(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/estado-cuenta-auto`, body)
      .pipe(
        map((data: any) => {
          return {...data,
            datosContribuyente: this.util.toLowercaseAttributes(data.datosContribuyente, true)
          };
        }),
        catchError((error) => throwError(error))
      );
  }

  planesPago(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/planes-pago`, body)
      .pipe(
        map((data: any) => {
          return {...data,
            estadoPlanAutos: data.estadoPlanAutos.map((historial) => {
              return this.util.toLowercaseAttributes(historial, true);
            }),
            datosContribuyente: this.util.toLowercaseAttributes(data.datosContribuyente, true)
          };
        }),
        catchError((error) => throwError(error))
      );
  }

  solicitudConstanciaRegularizacion(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/solicitud-constancia-regularizacion-auto`, body)
      .pipe(
        map((data: any) => {
          return {...data,
            datosContribuyente: this.util.toLowercaseAttributes(data.datosContribuyente, true)
          };
        }),
        catchError((error) => throwError(error))
      );
  }

  imprimirConstanciaRegularizacionAutomotor(body) {
    return this
    .http
    .post(`${this.apiUrl}/automotores/estado-deuda/imprimir-constancia-regularizacion-auto`, body, {responseType: 'blob'})
    .pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  consultaConstanciaRegularizacion(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/consulta-constancia-regularizacion-auto`, body)
      .pipe(
        map((data: any) => {
          return {...data,
            datosContribuyente: this.util.toLowercaseAttributes(data.datosContribuyente, true)
          };
        }),
        catchError((error) => throwError(error))
      );
  }

  datosActaInfracciones(acta) {
    return this
      .http
      .get(`${this.apiUrl}/automotores/datos-acta-infracciones/${acta}`)
      .pipe(
        map((data: any) => {
          return {
            infracciones: data.infracciones.map((acta) => {
              return this.util.toLowercaseAttributes(acta, true);
            }),
            datosActa: this.util.toLowercaseAttributes(data.datosActa, true)
          };
        }),
        catchError((error) => throwError(error))
      );
  }

  estadoDeuda(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/estado-deuda`, body)
      .pipe(
        map((data: any) => {
          return data.map((estadoDeuda) => {
              return this.util.toLowercaseAttributes(estadoDeuda, true);
          });
        }),
        catchError(this.handleError)
      );
  }

  planesPagoFechaPago(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/planes-pago-fecha-pago`, body)
      .pipe(
        map((data: any) => {
          return data.map((planesPago) => {
              return this.util.toLowercaseAttributes(planesPago, true);
          });
        }),
        catchError(this.handleError)
      );
  }

  imprimirBoletaAutomotor(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/estado-deuda/imprimir-boleta`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimirTasaAmbiental(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/tasa-ambiental/imprimir-boleta`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimirBoletaMultasTransito(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/imprimir-multas-transito`, body, {responseType: 'blob'})
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

  imprimirHistorialMultas(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/imprimir-historial-multas-auto`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimirBoletaPlanPago(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/imprimir-boleta-plan-pago`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimirEstadoDeudaPlan(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/imprimir-estado-deuda-planes`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimirEstadoCuentaAutomotor(body) {
    return this
      .http
      .post(`${this.apiUrl}/automotores/imprimir-estado-cuenta-auto`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
}
