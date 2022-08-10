import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { Util } from "../../../util";
import { ConsultaTransaccionesModel } from "../../../models/consulta-transacciones.models";
import { ConsultaTransaccionesDetalleModel } from "../../../models/consulta-transacciones-detalle.models";

@Injectable({
  providedIn: "root",
})
export class CentralPagosService {
  apiUrl = environment.API_SERVER;
  constructor(private http: HttpClient, private util: Util) {}

  consultaTransacciones(body) {
    return this.http
      .post(
        `${this.apiUrl}/clave-fiscal/central-de-pagos/consulta-de-transacciones`,
        body
      )
      .pipe(
        map((response: any) => {
          return response.map(
            (transacciones) => new ConsultaTransaccionesModel(transacciones)
          );
        }),
        catchError(this.handleError)
      );
  }

  consultaTransaccionesDetalle(body) {
    return this.http
      .post(
        `${this.apiUrl}/clave-fiscal/central-de-pagos/consulta-de-transacciones-detalle`,
        body
      )
      .pipe(
        map((response: any) => {
          return response.map(
            (transaccionesDetalle) =>
              new ConsultaTransaccionesDetalleModel(transaccionesDetalle)
          );
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
