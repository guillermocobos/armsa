
import {
  Component,
  OnDestroy,
  OnInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Subject, Subscription } from "rxjs";
import { CentralPagosService } from "../central-pagos.service";
import { ClaveFiscalService } from "../../../../clave-fiscal/clave-fiscal.service";
import { AuthenticationService } from "../../../../authentication/signin/authentication.service";
import { ConsultaTransaccionesModel } from "../../../../models/consulta-transacciones.models";
import { PagoMisCuentasService } from "../pagos/pagomiscuentas/pagomiscuentas.service";
import { ConsultaTransaccionesDetalleModel } from "../../../../models/consulta-transacciones-detalle.models";
import * as moment from "moment";
import { DynamicScriptLoaderService } from "../../../../dynamic-script-loader-service.service";

declare const $: any;
declare const DataTables: any;

@Component({
  selector: "app-consulta-pagos-electronicos",
  templateUrl: "./consulta-pagos-electronicos.component.html",
  styleUrls: ["./consulta-pagos-electronicos.component.sass"],
})
export class ConsultaPagosElectronicosComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  transacciones: ConsultaTransaccionesModel[] = [];
  transaccionesDetalle: ConsultaTransaccionesDetalleModel[] = [];
  transaccionesSubscription: Subscription;
  transaccionesDetalleSubscription: Subscription;
  @BlockUI("visualizar-datos") blockVisualizarDatos: NgBlockUI;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  anularPagoSubscription: Subscription;
  errorGeneral;
  mensajeExitoso;
  loadingPagomiscuentas = false;
  transaccionSeleccionada;
  loadingAnularPago = false;

  mostrarModalDetalle = false;
  mostrarFinalizacionDetalle = false;
  @ViewChild("modalDetalle", { static: false }) modalDetalle1: ElementRef;
  @ViewChild("modalAnularPago", { static: false }) modalAnularPago: ElementRef;

  datepickerOptions = {
    format: "DD/MM/YYYY",
    weekStart: 1,
    time: false,
    lang: "es",
    cancelText: "Cancelar",
    switchOnClick: true,
  };

  constructor(
    private fb: FormBuilder,
    private claveFiscalService: ClaveFiscalService,
    private centralPagosService: CentralPagosService,
    private authService: AuthenticationService,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private pagomiscuentasService: PagoMisCuentasService
  ) {
    moment.locale("es");
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        periodoDesde: [moment().format("DD/MM/YYYY"), Validators.required],
        periodoHasta: [moment().format("DD/MM/YYYY"), Validators.required],
      },
      { updateOn: "blur" }
    );
    this.dtOptions = {
      pageLength: 10,
      pagingType: "first_last_numbers",
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json",
      },
      columnDefs: [
        {
          targets: [1, 2, 3, 4],
          orderable: false,
        },
      ],
    };
    setTimeout(() => {
      this.startScript();
    });
  }

  startScript() {
    this.dynamicScriptLoader
      .load("form.min")
      .then((data) => {
        this.cargarCalendars();
      })
      .catch((error) => console.log(error));
  }

  private cargarCalendars() {
    $("#periodoDesde")
      .bootstrapMaterialDatePicker(this.datepickerOptions)
      .on("change", (e, date) => {
        this.form
          .get("periodoDesde")
          .setValue(moment(date).format("DD/MM/YYYY"));
      });
    $("#periodoDesde").bootstrapMaterialDatePicker("setMaxDate", new Date());

    $("#periodoHasta")
      .bootstrapMaterialDatePicker(this.datepickerOptions)
      .on("change", (e, date) => {
        this.form
          .get("periodoHasta")
          .setValue(moment(date).format("DD/MM/YYYY"));
      });
    $("#periodoHasta").bootstrapMaterialDatePicker("setMaxDate", new Date());
  }

  buscar() {
    this.blockVisualizarDatos.start();
    this.loading = true;
    const body = this.form.value;
    body.personaId = this.authService.getSessionUserId();
    body.fechaDesde = this.form.get("periodoDesde").value;
    body.fechaHasta = this.form.get("periodoHasta").value;

    this.transaccionesSubscription = this.centralPagosService
      .consultaTransacciones(body)
      .subscribe((transacciones: ConsultaTransaccionesModel[]) => {
        this.dtTrigger = new Subject();
        this.transacciones = transacciones;
        this.blockVisualizarDatos.stop();
        this.loading = false;
      });
  }

  buscarDetalle(identificacion: number, origen: string) {
    this.loading = true;
    const body = this.form.value;
    body.identificacion = identificacion;
    body.origen = origen;
    this.transaccionesDetalle = [];

    this.transaccionesDetalleSubscription = this.centralPagosService
      .consultaTransaccionesDetalle(body)
      .subscribe(
        (transaccionesDetalle: ConsultaTransaccionesDetalleModel[]) => {
          this.transaccionesDetalle = transaccionesDetalle;
          this.loading = false;
        }
      );
  }
  //BANELCO REMOVE INVOICE BANELCO
  anularPago() {
    this.loadingAnularPago = true;
    if (this.form.valid) {
      const body = {
        identificacion: this.transaccionSeleccionada.identificacion,
        descripcion: this.transaccionSeleccionada.descripcion,
      };
      console.log(
        "Entra a anularPago",
        this.transaccionSeleccionada.identificacion
      );
      this.pagomiscuentasService.anularPago(body).subscribe(
        (response: any) => {
          this.loadingAnularPago = false;
          this.mensajeExitoso = "La anulación de la solicitud del pago se realizó correctamente.";
        },
        (error) => {
          this.errorGeneral = "Hubo un error al procesar la anulación de la solicitud pago y/o la factura se encuentra vencida.";
          this.loadingAnularPago = false;
        }
      );
    } else {
      this.loadingAnularPago = false;
    }
  }

  get f() {
    return this.form.controls;
  }

  anularPagoModal(transaccion) {
    this.transaccionSeleccionada = transaccion;
    $(this.modalAnularPago.nativeElement).modal("show");
  }

  cerrarModalAnularPago() {
    this.transaccionSeleccionada = undefined;
    $(this.modalAnularPago.nativeElement).modal("hide");
  }

  onClickDetalle(identificacion: number, origen: string) {
    this.mostrarModalDetalle = true;
    this.buscarDetalle(identificacion, origen);
    $(this.modalDetalle1.nativeElement).modal("show");
  }

  closeModalDetalle() {
    this.mostrarModalDetalle = false;
    $(this.modalDetalle1.nativeElement).modal("hide");
  }
}
