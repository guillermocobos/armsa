import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/signin/authentication.service';
import { PresentacionDDJJModel } from '../../models/presentacion-ddjj.model';
import { ClaveFiscalService } from '../clave-fiscal.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-consulta-ddjj',
  templateUrl: './consulta-ddjj.component.html'
})
export class ConsultaDDJJComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  loading = false;
  presentaciones: PresentacionDDJJModel[] = [];
  presentacionesSubscription: Subscription;
  adicionalesPresentaciones: Subscription;
  imprimirSubscription: Subscription;
  loadingImprimirDDJJ = false;
  loadingImprimirAcuse = false;
  acuseActivo;
  identificacion;
  impuestos = [{
        id: '0011',
        nombre: 'T.I.S.S.H - Procom',
        conceptos: [
          {id: '0004', nombre: 'Declaracion Jurada Mensual'},
          {id: '0008', nombre: 'T.I.S.S.H. Procom - Anexo Retenciones'},
          {id: '0009', nombre: 'T.I.S.S.H. Procom - Anexo Percepciones'}
        ]
      }, {
        id: '0012',
        nombre: 'T.I.S.S.H - Regimen General',
        conceptos: [
          {id: '0004', nombre: 'Declaracion Jurada Mensual'},
          {id: '0008', nombre: 'T.I.S.S.H. General - Anexo Retenciones'},
          {id: '0009', nombre: 'T.I.S.S.H. General - Anexo Percepciones'}
        ]
      }, {
        id: '0013',
        nombre: 'T.I.S.S.H - Regimen Simplificado',
        conceptos: [
          {id: '0008', nombre: 'T.I.S.S.H. Simplif - Anexo Retenciones'},
          {id: '0009', nombre: 'T.I.S.S.H. Simplif - Anexo Percepciones'}
        ]
      },
        {
          id: '0014',
          nombre: 'Publicidad y Propaganda',
          conceptos: [
            {id: '0006', nombre: 'Original'},
          ]
        },
        {
          id: '0015',
          nombre: 'T.I.S.S.H - Agente de Retención',
          conceptos: [
            {id: '0002', nombre: 'Agente de Retención'},
            {id: '0010', nombre: 'Anexo de Retenciones'}
          ]
        },
        {
          id: '0024',
          nombre: 'T.I.S.S.H - Agente de Percepción',
          conceptos: [
            {id: '0003', nombre: 'Agente de Percepción'},
            {id: '0011', nombre: 'Anexo de Percepciones'}
          ]
        }
      ];
  conceptos = [];

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;

  constructor(
    private fb: FormBuilder,
    private claveFiscalService: ClaveFiscalService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      impuesto: [null, [Validators.required]],
      concepto: [null, [Validators.required]],
      anio: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      periodoDesde: [null, Validators.required],
      periodoHasta: [null, Validators.required]
    }, {updateOn: 'blur'});
  }

  buscar() {
    this.blockVisualizarDatos.start();
    this.loading = true;
    const body = this.form.value;
    body.personaId = this.authService.getSessionUserId();

    this.presentacionesSubscription = this.claveFiscalService.consultaPresentacionesDDJJ(body)
      .subscribe((presentaciones: PresentacionDDJJModel[]) => {
        this.presentaciones = presentaciones;
        this.blockVisualizarDatos.stop();
        this.loading = false;
      });
  }

  get f() {
    return this.form.controls;
  }

  listarConceptos(event) {
    const impuesto = this.impuestos.find((imp) => {
      return imp.id === event.target.value;
    });
    this.conceptos = impuesto ? impuesto.conceptos : [];
  }

  imprimirAcuse(pres) {

    this.loadingImprimirAcuse = true;
    this.acuseActivo = pres;

    console.log("acuse:"+JSON.stringify(pres));
    console.log("persona"+pres.personaId);
    console.log("tipoImp"+pres.tipoImponible);
    console.log("claveImp"+pres.claveImponible);
    console.log("CLAVE:"+pres.clave);

    const body1 = {
      personaId: pres.personaId,
      tipoImponible: pres.tipoImponible,
      claveImponible: pres.claveImponible,
      impuesto: pres.impuesto,
      concepto: pres.conceptoObligacion,
      noi: pres.numeroObligacionImpuesto
    };

    this.claveFiscalService.datosAdicAcuse(body1)
      .subscribe(
        (result: any) => {
          console.log("result:"+result[0]);
          console.log("col01:"+result[0].COL01);
          console.log("col02:"+result[0].COL02);
          console.log("nombre completo:"+result[0].NOMBRE_COMPLETO);

          this.identificacion = result[0].COL01 +"- " + result[0].COL02;


   // EJEMPLO OBJETO DE ACUSE DE RECIBO

    var acuse = [
   {
      "error":null,
      "transaccionId":pres.transaccionId,
      "acuseRecibo":[
         {
            "getAplicacion":"Salta, ",
            "fechaDePresentacion":pres.fechaPresentacion,
            "MUNI_DDJJ.FORMATEA_CUIT(CUIT)":"27-36802738-9",
            "establecimiento":"00",
            "razonSocial":result[0].NOMBRE_COMPLETO,
            "elDomicilio":result[0].DOMICILIO,
            "claveObligacion":pres.clave,
            "impuestoAbrev":pres.impuestoAbrev,
            "identificacion":this.identificacion,
            "LEYENDA_VENCIMIENTO":"Fecha de Vencimiento: ",
            "fechaPrimerVencimiento":result[0].FECHA_VTO,
            "parrafo_1":"          Acusamos recibo de su Declaración Jurada Original del Impuesto "+ pres.impuestoAbrev + " "+pres.descripcionConcepto + " referente al Período Fiscal " + pres.periodo + "/" + pres.anio + " mediante la presentación del Form. " + pres.formularioPresentado + " .-----",
            "getParrafo_2":"          Este recibo sirve como comprobante de haber presentado la Declaración Jurada mencionada, lo cual no significa prestar conformidad a la misma, la que se encuentra sujeta a las normas legales vigentes.",
            "CODIGO_BARRAS":"0012000800006100000115",
            "DESCRIPCION_IMPUESTO":"Tasa Inspección Seguridad,Salubridad-Higiene-R.General",
            "CONCEPTO_ABREV":"Anexo Retenciones",
            "TO_CHAR(NUMERO_OBLIGACION_IMPUESTO)":"6100",
            "TO_CHAR(TO_NUMBER(EL_IMPORTE),'FM999999999.90')":".00",
            "SON_PESOS":"Cero ",
            "EL_FORMULARIO":"0089",
            "EL_ANIO":"2019",
            "EL_PERIODO":"5"
         }
      ],
      "erroresAcuseRecibo":[
         {
            "DESCRIPCION_ERROR":" "
         }
      ],
      "hash":"",
      "ddjj":{
         "archivo":"eddfe9fa-c63b-461f-afaa-ae84c4687d75.txt",
         "formulario":pres.formularioPresentado,
         "tipoImponible":pres.tipo,
         "claveImponible":pres.claveImponible,
         "anio":2019,
         "periodo":5,
         "impuesto":pres.impuesto,
         "conceptoObligacion":pres.conceptoObligacion,
         "numeroObligacionImpuesto":6100,
         "numeroRectificativa":0,
         "numeroCuota":1,
         "fechaPresentacion":"2020-06-10T11:56:57.000Z",
         "importe":0,
         "textoPresentacion":"F977 - T.I.S.S.H-General - Anexo Retenciones Período 5-2019 - Original",
         "textoPresentacionCarga":"F977 - T.I.S.S.H-General - Anexo Retenciones Período 5-2019 - Original"
      }
   }
]



    const body = {
      tipoImpresion: 'individual',
      tipoPresentacion: 'WEB',
      acuse: acuse[0],
      contribuyente: this.authService.getContribuyenteSesion()
    };
    this.loadingImprimirAcuse = true;
    this.acuseActivo = acuse;
    this.imprimirSubscription = this.claveFiscalService.imprimirAcuseRecibo(body)
      .subscribe((response: any) => {
        this.loadingImprimirAcuse = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `boleta_${pres.transaccionId}.pdf`);
      });


        }

      );





  }

  ngOnDestroy(): void {
    if (this.presentacionesSubscription) {
      this.presentacionesSubscription.unsubscribe();
    }
  }

}
