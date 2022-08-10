import { catchError, map } from 'rxjs/operators';
import { ActividadInscriptaModel } from '../../models/actividad-inscripta.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../util';
import { throwError } from 'rxjs';
import { OpemTributoConceptoModel } from '../../models/opem-tributo-concepto.model';
import { DebitoAutomaticoModel } from '../../models/debito-automatico.model';
@Injectable()
export class BotonPagoService {

  apiUrl = environment.API_SERVER;

  constructor(private http: HttpClient, private util: Util) {
  }

  consultaTributosConceptos(personaId) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/pagos-electronicos/consulta-tributo-concepto/${personaId}`)
      .pipe(
        map((response: any) => {
          return response.map((tributoConcepto) => new OpemTributoConceptoModel(tributoConcepto));
        }),
        catchError(this.handleError)
      );
  }

  consultaPeriodosOPE(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/pagos-electronicos/consulta-periodos-ope`, body)
      .pipe(
        map((response: any) => {
          return response.map((deuda) => {
            return this.util.toLowercaseAttributes(deuda);
          });
        }),
        catchError(this.handleError)
      );
  }

  generarCabeceraPago(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/pagos-electronicos/registrar-cabecera-pago`, body)
      .pipe(
        map((response: any) => {
            return response;
        }),
        catchError(this.handleError)
      );
  }

  consultaCBUContribuyente(personaId) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/pagos-electronicos/obtener-cbu-contribuyente/${personaId}`)
      .pipe(
        map((response: any) => {
          return response.map((DebitoAutomatico) => new DebitoAutomaticoModel(DebitoAutomatico));
        }),
        catchError(this.handleError)
      );
  }

  imprimirComprobanteProvisorioOpe(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/pagos-electronicos/imprimir-constancia-provisoria-ope`, body, {responseType: 'blob'})
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
