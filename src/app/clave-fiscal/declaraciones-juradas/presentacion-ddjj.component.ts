import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClaveFiscalService } from "../clave-fiscal.service";
import { AuthenticationService } from "../../authentication/signin/authentication.service";
import { Subscription } from "rxjs";
import * as FileSaver from "file-saver";
import * as moment from 'moment';

declare const $: any;

@Component({
  selector: "app-presentacion-ddjj",
  templateUrl: "./presentacion-ddjj.component.html",
})
export class PresentacionDDJJComponent implements OnInit, OnDestroy {
  formDDJJ: FormGroup;
  ddjjFile: File;
  errorGeneralCarga;
  errorGeneralPresentacion;
  submitted = false;
  loading = false;
  ddjjs = [];
  ddjjsPresentadas = [];
  mensajeValidarCarga;
  loadingPresentar = false;
  cargarDDJJSubscription: Subscription;
  presentarrDDJJSubscription: Subscription;
  imprimirSubscription: Subscription;
  intimacionesProcom;
  loadingImprimirTodo = false;
  loadingImprimirDDJJ = false;
  acuseActivo;
  archivosCargados = [];

  @ViewChild("file", { static: false }) inputFileEl: ElementRef;
  @ViewChild("fileWrapper", { static: false }) fileWrapperEl: ElementRef;
  @ViewChild("validarCargaModal", { static: true })
  validarCargaModalEl: ElementRef;

  constructor(
    private claveFiscalService: ClaveFiscalService,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    this.formDDJJ = this.fb.group({
      ddjjFile: [null, Validators.required],
    });
  }

  get f() {
    return this.formDDJJ.controls;
  }

  public onFileChange(event) {
    this.processFile(event.target.files[0]);
  }

  private processFile(file: File) {
    this.ddjjFile = file;
    if (!this.ddjjFile) {
      return false;
    }
    if (this.getFileExtension(file.name) !== "DJ") {
      this.formDDJJ.get("ddjjFile").setErrors({
        customError: "La extensión del archivo es inválida. Debe ser .DJ",
      });
      this.ddjjFile = undefined;
      return false;
    }
    // this.formDDJJ.get('ddjjFile').setValue(file.name);
    // this.inputFileEl.nativeElement.value = '';
  }

  private getFileExtension(filename) {
    return filename.split(".").pop();
  }

  cargarDDJJ() {
    this.ddjjsPresentadas = [];
    this.submitted = true;
    this.loading = true;
    if (this.formDDJJ.valid && !this.cargaRepetida()) {
      const body = this.formDDJJ.value;
      body.personaId = this.authService.getSessionUserId();
      this.cargarDDJJSubscription = this.claveFiscalService
        .validarDDJJ(this.formDDJJ.value, this.ddjjFile)
        .subscribe(
          (ddjj) => {
            this.ddjjs.push(ddjj);
            this.archivosCargados.push(this.ddjjFile);
            this.clearFile();
            this.submitted = false;
            this.loading = false;
          },
          (error) => {
            this.errorGeneralCarga = error.error.error || error.error.message;
            this.loading = false;
          }
        );
    } else {
      this.mensajeValidarCarga =
        "La DDJJ que intenta presentar, ya fué cargada anteriormente o el archivo es incorrecto, Verifique por favor";
      $(this.validarCargaModalEl.nativeElement).modal("show");
      this.clearFile();
      this.loading = false;
    }
  }

  clearFile() {
    this.formDDJJ.reset();
    this.ddjjFile = undefined;
    this.fileWrapperEl.nativeElement.value = "";
  }

  cargaRepetida() {
    return this.archivosCargados.find((ddjj) => {
      return ddjj.name === this.ddjjFile.name;
    });
  }

  quitarDdjj(index) {
    this.archivosCargados.splice(index, 1);
    this.ddjjs.splice(index, 1);
  }

  presentarDDJJ() {
    this.loadingPresentar = true;
    const body: any = {};
    body.ddjjs = this.ddjjs;
    body.personaId = this.authService.getSessionUserId();
    body.usuario = this.authService.getSessionUser();
    body.sessionId = this.authService.getToken();
    this.presentarrDDJJSubscription = this.claveFiscalService
      .presentarDDJJ(body)
      .subscribe(
        (response) => {
          this.ddjjsPresentadas = response;
          this.ddjjs = [];
          this.loadingPresentar = false;
        },
        (error) => {
          this.errorGeneralPresentacion =
            error.error.error || error.error.message;
          this.loadingPresentar = false;
        }
      );
  }

  cerrarValidarCargaModal() {
    this.mensajeValidarCarga = undefined;
    $(this.validarCargaModalEl.nativeElement).modal("show");
  }

  imprimirAcuse(acuse) {
    console.log("Acuse desde presentacion-ddjj:" + acuse);
    console.log(
      "acuse.acuseRecibo[0].fechaDePresentacion:" +
        acuse.acuseRecibo[0].fechaDePresentacion.toString()
    );
    console.log(
      "acuse.acuseRecibo[0].establecimiento:" +
        acuse.acuseRecibo[0].establecimiento
    );

    /*
    EJEMPLO OBJETO DE ACUSE DE RECIBO

    [
   {
      "error":null,
      "transaccionId":"13185",
      "acuseRecibo":[
         {
            "GET_APLICACION":"Salta, ",
            "FECHA_DE_PRESENTACION":"10 DE JUNE DE 2020",
            "MUNI_DDJJ.FORMATEA_CUIT(CUIT)":"27-36802738-9",
            "ESTABLECIMIENTO":"00",
            "RAZON_SOCIAL":"MARIA FERNANDEZ FER A DEA MARIA EUGENIA BARRAZA DE LA CRUS",
            "EL_DOMICILIO":"Del MILAGRO 456 Barrio:Juan M. Rosas (4400) Capital-Salta",
            "CLAVE_OBLIGACION":"20190500006100 00",
            "IMPUESTO_ABREV":"T.I.S.S.H-General",
            "IDENTIFICACION":"802-738",
            "LEYENDA_VENCIMIENTO":"Fecha de Vencimiento: ",
            "FECHA_PRIMER_VENCIMIENTO":"12-06-2019",
            "PARRAFO_1":"          Acusamos recibo de su Declaración Jurada Original del Impuesto T.I.S.S.H-General Anexo Retenciones referente al Período Fiscal 05/2019 mediante la presentación del Form. F977 .-----",
            "GET_PARRAFO_2":"          Este recibo sirve como comprobante de haber presentado la Declaración Jurada mencionada, lo cual no significa prestar conformidad a la misma, la que se encuentra sujeta a las normas legales vigentes.",
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
         "formulario":"0089",
         "tipoImponible":"0008",
         "claveImponible":"00000000000802-00000000000738",
         "anio":2019,
         "periodo":5,
         "impuesto":"0012",
         "conceptoObligacion":"0008",
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
     */
    const body = {
      tipoImpresion: "individual",
      tipoPresentacion: "WEB",
      acuse: acuse,
      contribuyente: this.authService.getContribuyenteSesion(),
    };
    this.loadingImprimirDDJJ = true;
    this.acuseActivo = acuse;
    this.imprimirSubscription = this.claveFiscalService
      .imprimirAcuseRecibo(body)
      .subscribe((response: any) => {
        this.loadingImprimirDDJJ = false;
        const blob = new Blob([response], {
          type: "application/pdf",
        });
        FileSaver.saveAs(blob, `boleta_${acuse.transaccionId}.pdf`);
      });
  }

  imprimirTodo() {
    this.loadingImprimirTodo = true;
    const body = {
      tipoImpresion: "unificado",
      tipoPresentacion: "WEB",
      acuses: this.ddjjsPresentadas,
      contribuyente: this.authService.getContribuyenteSesion(),
    };
    this.imprimirSubscription = this.claveFiscalService
      .imprimirAcuseRecibo(body)
      .subscribe((response: any) => {
        this.loadingImprimirTodo = false;
        const blob = new Blob([response], {
          type: "application/pdf",
        });
        FileSaver.saveAs(blob, `boleta_unificada.pdf`);
      });
  }

  ngOnDestroy(): void {
    if (this.cargarDDJJSubscription) {
      this.cargarDDJJSubscription.unsubscribe();
    }
    if (this.presentarrDDJJSubscription) {
      this.presentarrDDJJSubscription.unsubscribe();
    }
    if (this.imprimirSubscription) {
      this.imprimirSubscription.unsubscribe();
    }
  }
}
