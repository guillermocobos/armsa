import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Util } from '../../util';

@Injectable()
export class F982Service {

  apiUrl = environment.API_SERVER;
  private _jsonURL = 'assets/consulta_cta_cte_unificada.json';
  private obligaciones = {};
  private tabs = [];
  private deudasSelected = [];
  private activeTab;

  constructor(private http: HttpClient, private util: Util) {
  }

  consultarObligaciones(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/cta-cte-unificada/consulta-obligaciones`, body)
      //.get(this._jsonURL)
      .pipe(
        map((response: any) => {
          return response.map((nodo) => this.util.toLowercaseAttributes(nodo, true));
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

  getObligaciones() {
    return this.obligaciones;
  }

  setObligaciones(obligaciones) {
    this.obligaciones = obligaciones;
  }

  clearObligaciones() {
    this.obligaciones = {};
  }

  getTabs() {
    return this.tabs;
  }

  setTabs(tabs) {
    this.tabs = tabs;
  }

  getActiveTab() {
    return this.activeTab;
  }

  setActiveTab(activeTab) {
    this.activeTab = activeTab;
  }

  getDeudasSelected() {
    return this.deudasSelected;
  }

  setDeudasSelected(deudasSelected) {
    this.deudasSelected = deudasSelected;
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
