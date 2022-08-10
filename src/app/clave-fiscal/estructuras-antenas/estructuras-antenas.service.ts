import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../util';
import { throwError } from 'rxjs';
import { OpemTributoConceptoModel } from '../../models/opem-tributo-concepto.model';
@Injectable()
export class EstructurasAntenasService {

  apiUrl = environment.API_SERVER;

  constructor(private http: HttpClient, private util: Util) {
  }

  getInstalacionesElectricas() {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/estructuras-antenas/instalaciones-electricas`)
      .pipe(
        map((response: any) => {
          return response.map((data) => this.util.toLowercaseAttributes(data, true));
        }),
        catchError(this.handleError)
      );
  }

  recuperaRazonSocial(cuit) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/estructuras-antenas/recupera-razon-social/${cuit}`)
      .pipe(
        map((response: any) => {
          if (response.datosCuit.length > 0) {
            return {
              datosCuit: this.util.toLowercaseAttributes(response.datosCuit[0], true),
              razonSocial: response.razonSocial.length > 0 ? this.util.toLowercaseAttributes(response.razonSocial[0], true) : undefined,
            };
          } else {
            throw new Error('CUIT no encontrado en nuestra base de datos.');
          }
        }),
        catchError(this.handleError)
      );
  }

  obtenerCalles() {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/estructuras-antenas/obtener-calles`)
      .pipe(
        map((response: any) => {
            return response.map((calle) => {
              return calle.CALLE_DESCR;
            });
          }),
        catchError(this.handleError)
      );
  }

  obtenerDatosInspeccion() {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/estructuras-antenas/obtener-datos-inspeccion`)
      .pipe(
        map((response: any) => {
          return {
            datosInspeccion: response.datosInspeccion.map((datoInspeccion) => {
              return this.util.toLowercaseAttributes(datoInspeccion, true)
            }),
            datosTasaPeriodo: response.datosTasaPeriodo
          };
        }),
        catchError(this.handleError)
      );
  }

  obtenerTiposEstructuras() {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/estructuras-antenas/obtener-tipos-estructuras`)
      .pipe(
        map((response: any) => {
          return response.map((tipoEstructura) => {
            return this.util.toLowercaseAttributes(tipoEstructura, true)
          });
        }),
        catchError(this.handleError)
      );
  }

  obtenerCuentaTributaria() {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/estructuras-antenas/obtener-cuenta-tributaria`)
      .pipe(
        map((response: any) => {
          return response.map((cuenta) => {
            return this.util.toLowercaseAttributes(cuenta, true)
          });
        }),
        catchError(this.handleError)
      );
  }

  actualizarInstalacion(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/estructuras-antenas/actualizar-instalacion`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  estructurasValorAdicional(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/estructuras-antenas/estructuras-valor-adicional`, body)
      .pipe(
        map((response: any) => {
          if(response.length > 0) {
            return this.util.toLowercaseAttributes(response[0], true)
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  tieneDeudaEstructura(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/estructuras-antenas/tiene-deuda-estructura`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  insertarInstalacion(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/estructuras-antenas/insertar-instalacion`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  insertarInstalacionTasa(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/estructuras-antenas/insertar-instalacion-tasa`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  eliminarEstructura(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/estructuras-antenas/eliminar-estructura`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimir(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/estructuras-antenas/imprimir-constancia`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimirCuenta(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/estructuras-antenas/cuenta-tributaria/imprimir`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(error);
  }
}
