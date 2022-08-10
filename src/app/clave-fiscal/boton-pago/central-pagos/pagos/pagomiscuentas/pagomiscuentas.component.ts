import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  Input,
  EventEmitter,
} from "@angular/core";
import { PagoMisCuentasService } from "./pagomiscuentas.service";
import { Subscription } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../../../authentication/signin/authentication.service";
import * as FileSaver from "file-saver";
import { Router } from "@angular/router";

@Component({
  selector: "app-pagomiscuentas",
  templateUrl: "./pagomiscuentas.component.html",
})
export class PagoMisCuentasComponent implements OnInit, OnDestroy {
  @Output() onFinalizar = new EventEmitter();
  @Output() onCancelar = new EventEmitter();

  @Input() personaId;
  @Input() totalOperacion = 500;
  @Input() secuencia;
  @Input() fechaPago;
  @Input() detalles = [];

  bancosSubscription: Subscription;
  bancos = [];
  form: FormGroup;
  submitted = false;
  loading = false;
  totalDeudaActual = 0;
  totalImporteActualizado = 0;
  loadingImprimir = false;
  imprimirSubscription: Subscription;
  mostrarFinalizacionPagomiscuentas = false;
  numeroOperacion;
  mostrarFormulario = true;
  mensajeExitoso =
    "Su pago se ha registrado exitosamente. <br/>En los próximos minutos recibirá un correo electrónico con la Confirmación de Pago.";
  errorGeneral;
  constructor(
    private pagomiscuentasService: PagoMisCuentasService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.detalles.forEach((detalle) => {
      this.totalDeudaActual += detalle.deudaActual;
      this.totalImporteActualizado += detalle.importeActualizado;
    });
    this.form = this.fb.group(
      {
        banco: [null, [Validators.required]],
        titular: [null, [Validators.required]],
      },
      { updateOn: "blur" }
    );
    this.bancosSubscription = this.pagomiscuentasService
      .consultaBancos()
      .subscribe((data) => {
        this.bancos = data.banks;
      });
  }

  get f() {
    return this.form.controls;
  }

  imprimirConstanciaBanelco() {
    this.loadingImprimir = true;
    const body = {
      numeroOperacion: this.numeroOperacion,
    };
    this.imprimirSubscription = this.pagomiscuentasService
      .imprimirConstanciaBanelco(body)
      .subscribe((response: any) => {
        this.loading = false;
        const blob = new Blob([response], {
          type: "application/pdf",
        });
        FileSaver.saveAs(
          blob,
          `constancia_banelco_${this.numeroOperacion}.pdf`
        );
        this.loadingImprimir = false;
      });
  }

  generarVolantePago() {
    this.loading = true;
    this.submitted = true;
    if (this.form.valid) {
      const [bancoId, bancoNombre] = this.form.get("banco").value.split("|");
      const body = {
        bancoId,
        bancoNombre,
        secuencia: this.secuencia,
        cuit: this.authenticationService.getContribuyenteSesion().cuit,
        fechaPago: this.fechaPago,
        totalOperacion: this.totalOperacion,
      };
      this.pagomiscuentasService.registrarPago(body).subscribe(
        (response: any) => {
          this.loading = false;
          this.numeroOperacion = response.numeroOperacion;
          this.mostrarFinalizacionPagomiscuentas = true;
          this.mostrarFormulario = false;
          this.submitted = false;
        },
        (error) => {
          this.errorGeneral = 'Hubo un error al procesar la deuda , intente más tarde porfavor.'
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }

  finalizar() {
    this.onFinalizar.emit();
    this.router.navigate(["/clave-fiscal/inicio"]);
  }
  ngOnDestroy() {
    if (this.bancosSubscription) {
      this.bancosSubscription.unsubscribe();
    }
  }
}
