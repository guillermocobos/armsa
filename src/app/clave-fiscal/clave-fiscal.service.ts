import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ActividadContribuyenteModel } from '../models/actividad-contribuyente.model';
import { ActividadInscriptaModel } from '../models/actividad-inscripta.model';
import { BoletaInscripcionModel } from '../models/boleta-inscripcion.model';
import { BoletaPlanModel } from '../models/boleta-plan.model';
import { ContribuyenteModel } from '../models/contribuyente.model';
import { CuentaUnicaPlanModel } from '../models/cuenta-unica-plan.model';
import { DomicilioContribuyenteModel } from '../models/domicilio-contribuyente.model';
import { EstadoDeudaCabeceraModel } from '../models/estado-deuda-cabecera.model';
import { EstadoDeudaImponibleModel } from '../models/estado-deuda-imponible.model';
import { EstadoDeudaPlanCabeceraModel } from '../models/estado-deuda-plan-cabecera.model';
import { EstadoDeudaPlanCuotaModel } from '../models/estado-deuda-plan-cuota.model';
import { EstadoDeudaPlanVencidaHistModel } from '../models/estado-deuda-plan-vencida-hist.model';
import { EstadoDeudaPlanVencidaModel } from '../models/estado-deuda-plan-vencida.model';
import { ImpuestoInscriptoModel } from '../models/impuesto-inscripto.model';
import { InscripcionModel } from '../models/inscripcion.model';
import { PadronContribuyenteModel } from '../models/padron-contribuyente.model';
import { PeriodoInscripcionModel } from '../models/periodo-inscripcion.model';
import { PresentacionDDJJModel } from '../models/presentacion-ddjj.model';
import { ResponsableContribuyenteModel } from '../models/responsable-contribuyente.model';
import { Util } from '../util';
import { PadronPyPModel } from '../models/padron-pyp.model';
import { CabeceraPypModel } from '../models/cabecera-pyp.model';

@Injectable()
export class ClaveFiscalService {

  apiUrl = environment.API_SERVER;

  constructor(private http: HttpClient, private util: Util) {
  }

  cargarCuentaUnica(personaId) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/carga-cuenta-unica/${personaId}`)
      .pipe(
        map((response: any) => {
          return {
              inscripciones: response.tipoImponible.map((inscripcion) => new InscripcionModel(inscripcion)),
              planes: response.planes.map((plan) => new CuentaUnicaPlanModel(plan))
            };
        }),
        catchError(this.handleError)
      );
  }

  consultaDatosActividadesEconomicas(tipoImponible, claveImponible) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/actividades-economicas/${tipoImponible}/${claveImponible}`)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  consultaActividadesInscriptas(tipoImponible, claveImponible) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/actividades-inscriptas/${tipoImponible}/${claveImponible}`)
      .pipe(
        map((response: any) => {
          return response.map((actividad) => new ActividadInscriptaModel(actividad));
        }),
        catchError(this.handleError)
      ).toPromise();
  }

  consultaImpuestosInscriptos(tipoImponible, claveImponible) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/impuestos-inscriptos/${tipoImponible}/${claveImponible}`)
      .pipe(
        map((response: any) => {
          return response.map((impuesto) => new ImpuestoInscriptoModel(impuesto));
        }),
        catchError(this.handleError)
      ).toPromise();
  }

  consultaEstadoDeuda(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/estado-deuda`, body)
      .pipe(
        map((response: any) => {
          return {
              cabeceraLibreDeuda: new EstadoDeudaCabeceraModel(response.cabeceraLibreDeuda),
              estadoDeudaImp: response.estadoDeudaImp.map((estadoDeudaImp) => new EstadoDeudaImponibleModel(estadoDeudaImp)),
              intimacionProcom: response.intimacionProcom
          };
        }),
        catchError(this.handleError)
      );
  }

  consultaBoletasPago(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/boletas-inscripcion`, body)
      .pipe(
        map((response: any) => {
          return response.map((boletaPago) => new BoletaInscripcionModel(boletaPago));
        }),
        catchError(this.handleError)
      );
  }

  obtieneDeudaTishh(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/obtiene-deuda-tishh`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimirBoletaTishh(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/imprimir-boleta-tishh`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  imprimirBoletaCtaUnica(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/imprimir-boleta`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  //Jsilva, Incidente 109245
  imprimirBoletaCtaUnicaPlanes(body) {
    console.log("ARMSA-FRONT-- entró a imprimirBoletaCtaUnicaPlanes(body)");//borrar
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/imprimir-boleta-planes`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  consultaDatosContribuyente(personaId) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/datos-contribuyente/${personaId}`)
      .pipe(
        map((response: any) => {
          return {
            contribuyente: new ContribuyenteModel(response.contribuyente),
            responsables: response.responsables ? response.responsables.map((responsable) => new ResponsableContribuyenteModel(responsable)) : [],
            padrones: response.padrones.map((padron) => {
                padron.ACTIVIDADES_PRINCIPALES = padron.ACTIVIDADES_PRINCIPALES.map((act) => new ActividadContribuyenteModel(act));
                padron.ACTIVIDADES_SECUNDARIAS = padron.ACTIVIDADES_SECUNDARIAS.map((act) => new ActividadContribuyenteModel(act));
                padron.PERIODOS_INSCRIPCION = padron.PERIODOS_INSCRIPCION.map((periodo) => new PeriodoInscripcionModel(periodo));
                return new PadronContribuyenteModel(padron);
            }),
            domicilio: new DomicilioContribuyenteModel(response.domicilio)
          };
        }),
        catchError(this.handleError)
      );
  }

  actualizarEmail(personaId) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/datos-contribuyente/${personaId}`)
      .pipe(
        map((response: any) => {
          return {
            contribuyente: new ContribuyenteModel(response.contribuyente),
            responsables: response.responsables ? response.responsables.map((responsable) => new ResponsableContribuyenteModel(responsable)) : [],
            padrones: response.padrones.map((padron) => {
              padron.ACTIVIDADES_PRINCIPALES = padron.ACTIVIDADES_PRINCIPALES.map((act) => new ActividadContribuyenteModel(act));
              padron.ACTIVIDADES_SECUNDARIAS = padron.ACTIVIDADES_SECUNDARIAS.map((act) => new ActividadContribuyenteModel(act));
              padron.PERIODOS_INSCRIPCION = padron.PERIODOS_INSCRIPCION.map((periodo) => new PeriodoInscripcionModel(periodo));
              return new PadronContribuyenteModel(padron);
            }),
            domicilio: new DomicilioContribuyenteModel(response.domicilio)
          };
        }),
        catchError(this.handleError)
      );
  }

  consultaEstadoDeudaPlanes(planFacilidad) {
    return this
      .http
      .get(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/estado-deuda-plan/${planFacilidad}`)
      .pipe(
        map((response: any) => {
          return {
            estadoDeudaCabecera: new EstadoDeudaPlanCabeceraModel(response.estadoDeudaCabecera[0]),
            estadoDeudaPlanCuotas: response.estadoDeudaPlanCuotas.map((estadoDeudaPlan) => new EstadoDeudaPlanCuotaModel(estadoDeudaPlan)),
            estadoDeudaPlanVencidas: response.estadoDeudaPlanVencidas.map((estadoDeudaVencida) => new EstadoDeudaPlanVencidaModel(estadoDeudaVencida)),
            estadoDeudaPlanVencidasHist: response.estadoDeudaPlanVencidasHist.map((estadoDeudaVencidaHist) => new EstadoDeudaPlanVencidaHistModel(estadoDeudaVencidaHist))
          };
        }),
        catchError(this.handleError)
      );
  }

  consultaBoletasPagoPlanes(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/consulta-cuenta-unica/boletas-planes`, body)
      .pipe(
        map((response: any) => {
          return response.map((boletaPago) => new BoletaPlanModel(boletaPago));
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

  validarDDJJ(body, ddjj) {
    console.log('DDJJ', ddjj);
    const formData = this.util.createFormData(body);
    formData.append('ddjj', ddjj, ddjj.name);

    return this.http.post(`${this.apiUrl}/clave-fiscal/declaraciones-juradas/validar-ddjj` , formData)
      .pipe(
        map((response: any) => {
          const ddjjs = response.map((ddjj) => {
            return this.util.toLowercaseAttributes(ddjj, true);
          });
          ddjjs[0]['textoPresentacionCarga'] = ddjjs[0].textoPresentacion;
          if (ddjjs.length > 1) {
            ddjjs['adicionales'] = [];
            for (let i = 1; i < ddjjs.length; i++) {
              if (i === 1 && ddjjs[i].numeroRectificativa > 0) {
                ddjjs[0]['textoPresentacionCarga'] + ddjjs[0].textoPresentacion + ' - Rectificativa';
              }
              ddjjs[0]['textoPresentacionCarga'] += '<br/> ' + ddjjs[i].textoPresentacion;
              ddjjs['adicionales'].push(ddjjs[i]);
            }
          }
          return ddjjs[0];
        }),
        catchError(this.handleError)
      );
  }

  presentarDDJJ(body) {
    return this.http.post(`${this.apiUrl}/clave-fiscal/declaraciones-juradas/presentar-ddjj`, body)
      .pipe(
        map((response: any) => {
          return response.map((data) => {
            return {...data,
              acuseRecibo: data.acuseRecibo.map((acuse) => this.util.toLowercaseAttributes(acuse, true)),
              erroresAcuseRecibo: data.erroresAcuseRecibo.map((errorAcuse) => this.util.toLowercaseAttributes(errorAcuse, true))
            };
          });
        }),
        catchError(this.handleError)
      );
  }

  imprimirAcuseRecibo(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/declaraciones-juradas/imprimir-acuse-recibo`, body, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  datosAdicAcuse(body){
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/declaraciones-juradas/datos-adicionales-acuse`, body)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  consultaPresentacionesDDJJ(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/declaraciones-juradas/consulta-presentaciones`, body)
      .pipe(
        map((response: any) => {
          return response.map((presentacion) => new PresentacionDDJJModel(presentacion));
        }),
        catchError(this.handleError)
      );
  }

  consultaPadrones(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/buscar-padron`, body)
      .pipe(
        map((response: any) => {
          return {
            padrones: response.padrones.map((padron) => new PadronPyPModel(padron)),
            pendientes: response.pendientes.map((cabecera) => new CabeceraPypModel(cabecera))
          };
        }),
        catchError(this.handleError)
      );
  }

  cargarDDJJPyP(body) {
    return this
      .http
      .post(`${this.apiUrl}/clave-fiscal/publicidad-propaganda/cargar-ddjj`, body)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }


}
