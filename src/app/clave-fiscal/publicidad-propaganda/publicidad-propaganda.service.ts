import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Util } from '../../util';

@Injectable()
export class PublicidadPropagandaService {

  apiUrl = environment.API_SERVER;
  private _jsonURL = 'assets/consulta_cta_cte_unificada.json';
  private obligaciones = {};
  private tabs = [];
  private deudasSelected = [];
  private activeTab;

  constructor(private http: HttpClient, private util: Util) {
  }

  consultaTributosConceptos() {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/tributos-conceptos`)
      .pipe(
        map((response: any) => {
          return response.map((nodo) => this.util.toLowercaseAttributes(nodo, true));
        }),
        catchError(this.handleError)
      );
  }

  obtenerOPEConsolidadas() {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/obtener-ope-consolidadas`)
      .pipe(
        map((response: any) => {
          return response.map((data) => this.util.toLowercaseAttributes(data, true));
        }),
        catchError(this.handleError)
      );
  }

  obtenerDetalleOPEConsolidadas(numeroOPE) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/obtener-detalle-ope-consolidadas/${numeroOPE}`)
      .pipe(
        map((response: any) => {
          return response.map((data) => this.util.toLowercaseAttributes(data, true));
        }),
        catchError(this.handleError)
      );
  }

  imprimirConstanciaProvisoriaOPE(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/obtener-detalle-ope-consolidadas/imprimir-provisoria-OPE`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  listarCarteles(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/listar-carteles`, body)
      .pipe(
        map((response: any) => {
          return response.map((data) => this.util.toLowercaseAttributes(data, true));
        }),
        catchError(this.handleError)
      );
  }

  agregarCartel(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/insertar-borrador-ddjj`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  presentarDDJJCarteles(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/presentar-ddjj-carteles`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  presentarDDJJVehiculo(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/presentar-ddjj-vehiculo`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  quitarCartel(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/quitar-cartel-ddjj`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  generarObligacionesDetalles(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/cta-cte-unificada/generar-obligaciones-detalles`, body, {responseType: 'blob'})
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
