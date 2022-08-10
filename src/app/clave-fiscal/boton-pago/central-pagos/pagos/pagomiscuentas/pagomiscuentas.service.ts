import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError, of } from "rxjs";
import { environment } from "../../../../../../environments/environment";
import { Util } from "../../../../../util";

@Injectable({
  providedIn: "root",
})
export class PagoMisCuentasService {
  apiUrl = environment.API_SERVER;
  bancos = {
    banks: [
      {
        name: "",
        bank_id: "",
      },
    ],
  };

  constructor(private http: HttpClient, private util: Util) {}

  consultaBancos() {
    //return of(this.bancos);
    return this.http
      .get(`${this.apiUrl}/clave-fiscal/banelco/bancos-banelco`)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  generarDetallesVtos(body) {
    return this.http
      .post(
        `${this.apiUrl}/clave-fiscal/banelco/generar-detalles-vtos-banelco`,
        body
      )
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  registrarPago(body) {
    return this.http
      .post(`${this.apiUrl}/clave-fiscal/banelco/pagar-banelco`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  anularPago(body) {
    return this.http
      .post(`${this.apiUrl}/clave-fiscal/banelco/anular-banelco`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimirConstanciaBanelco(body) {
    return this.http
      .post(`${this.apiUrl}/clave-fiscal/banelco/imprimir-constancia`, body, {
        responseType: "blob",
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = "";
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
