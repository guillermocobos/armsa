import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {ClaveFiscalService} from "../../clave-fiscal.service";
import {AuthenticationService} from "../../../authentication/signin/authentication.service";
import {environment} from "../../../../environments/environment";
import {DynamicScriptLoaderService} from "../../../dynamic-script-loader-service.service";
import * as moment from 'moment';
import {PagoTarjetaService} from "./pago-tarjeta.service";
import {Subscription} from "rxjs";
import {ScrollToConfigOptions, ScrollToService} from "@nicky-lenaers/ngx-scroll-to";

declare const Decidir: any;

@Component({
  selector: 'app-form-pago-tarjeta',
  templateUrl: './form-pago-tarjeta.component.html',
  styleUrls: ['./form-pago-tarjeta.component.scss']
})
export class FormPagoTarjetaComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  submitted = false;
  loading = false;
  disabled = false;
  decidir;
  debito = false;
  errorGeneral;
  errorCardNumber;
  visa = true;
  centralPagos = true;
  cantCuotas;
  importeOriginal;
  typeTarjeta;
  nuevoImporte;
  errorSecurityCode;
  errorCardHolder;
  errorExpirationMonth;
  errorExpirationYear;
  errorCardHolderType;
  errorCardHolderDocNumber;
  currentYear = moment().format('YY');
  procesarPagoSubscription: Subscription;
  @Output() pagoExitoso = new EventEmitter();
  @Output() onCancelar = new EventEmitter();

  @Input() personaId;
  @Input() totalOperacion = 500;
  @Input() tipoTarjeta;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @ViewChild('formPagoTarjeta', {static: false}) formPagoTarjetaEl: ElementRef;

  config: ScrollToConfigOptions = {
    target: 'form_pago_tarjeta'
  };

  constructor(
    private fb: FormBuilder,
    private claveFiscalService: ClaveFiscalService,
    private authService: AuthenticationService,
    private pagoTarjetaService: PagoTarjetaService,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private _scrollToService: ScrollToService
  ) {
  }

  ngOnInit() {
    if (!this.tipoTarjeta) {
      this.tipoTarjeta = "";
      this.centralPagos = false;
    }

    this.form = this.fb.group({
      card_holder_name: [null, [Validators.required]],
      tipo_tarjeta: [this.tipoTarjeta, [Validators.required]],
      card_number: [null, [Validators.required, Validators.minLength(16)]],
      security_code: [null, [Validators.required, Validators.minLength(3)]],
      card_expiration_month: [null, [Validators.required, Validators.min(1), Validators.max(12), Validators.minLength(2)]],
      card_expiration_year: [null, [Validators.required, Validators.min(+this.currentYear), Validators.minLength(2)]],
      card_holder_doc_type: [null, Validators.required],
      card_holder_doc_number: [null, Validators.required],
      user_email: [null, [Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$')]],
      total_operacion: [this.totalOperacion, Validators.required],
      installments: [1, Validators.required],
      monto_cuotas: [this.totalOperacion, Validators.required]
    }, {updateOn: 'blur'});

    if (!this.personaId) {
      this.personaId = this.authService.getSessionUserId();
    }

    this.typeTarjeta = this.form.get('tipo_tarjeta').value;
    this.cantCuotas = 1;

    this.importeOriginal = this.totalOperacion;

    if(this.form.get('tipo_tarjeta').value != 1) {
      this.visa = false;
    }
    else{
      this.visa = true;
    }

    if(this.form.get('tipo_tarjeta').value == '31') {
      this.debito = true;
    }
    else{
      this.debito = false;
    }

    this._scrollToService.scrollTo(this.config);
  }

  get f() {
    return this.form.controls;
  }

  cancelar() {
    this.onCancelar.emit(true);

  }

  onChangeTipoTarjeta(event){
    console.log("tipo_tarjeta:"+ this.form.get('tipo_tarjeta').value);
    console.log("event:"+event.target.value);
    this.typeTarjeta = event.target.value;

    if(event.target.value != 1) {
      this.visa = false;
    }
    else{
      this.form.get('installments').setValue(1);
      this.visa = true;
    }
    this.cantCuotas = 1;
    this.calculaNuevoImporte();
  }

  onChangeCuotas(event){
    console.log("cant cuotas:"+ event.target.value);
    this.cantCuotas = event.target.value;
    this.calculaNuevoImporte();

  }

  calculaNuevoImporte(){

    var  montoCuotas = 0;

    const body = {
      importe: this.importeOriginal,
      cuotas: this.cantCuotas,
      tarjeta: this.typeTarjeta
    }

    this.pagoTarjetaService.nuevoImporte(body)
      .subscribe((data) => {
        console.log("data:"+data);
        console.log("dataResult:"+data.result);
        this.nuevoImporte = data.result;


        montoCuotas = (this.nuevoImporte.replace(",","")/this.cantCuotas);

        this.form.get('monto_cuotas').setValue(montoCuotas.toFixed(2));
        this.form.get('total_operacion').setValue(this.nuevoImporte);



      }, error => {

        if (error.status === 400) {
          //console.log(error);
        }
        if (error.status === 500) {
          this.errorGeneral = error.message;
        }

      });

  }

  async procesarPago() {
    this.submitted = true;
    this.loading = true;
    this.disabled = true;
    console.log(this.formPagoTarjetaEl.nativeElement);
    if (this.form.valid) {
      await this.dynamicScriptLoader.load('decidir').then(data => {
        const decidir = new Decidir(environment.DECIDIR_URL, true);
        decidir.setPublishableKey(environment.DECIDIR_API_KEY_PUBLIC);
        decidir.setTimeout(environment.DECIDIR_TIMEOUT);
        decidir.createToken(this.formPagoTarjetaEl.nativeElement, this.sdkResponseHandler);
      }).catch(error => console.log(error));
    } else {
      this.loading = false;
      this.disabled = false;
    }

  }

  sdkResponseHandler = (status, response) => {
    console.log('status', status);
    console.log('response', response);

    if (status !== 200 && status !== 201) {
      if(response.error && response.error.length > 0) {
        const that = this;
        response.error.forEach(function(el) {
          if(el.error) {
            switch(el.error.type) {
              case 'invalid_expiry_date': {
                that.errorExpirationMonth = 'La fecha de expiración es incorrecta.';
                break;
              }
              case 'empty_card_number': {
                that.errorCardNumber = 'Ingrese el número de tarjeta.';
                break;
              }
              case 'empty_card_holder_name': {
                that.errorCardHolder = 'Faltan los datos del titular.';
                break;
              }
              case 'nan_card_number': {
                that.errorCardNumber = 'El número de tarjeta debe ser numérico.';
                break;
              }
              case 'invalid_card_number': {
                that.errorCardNumber = 'Número de tarjeta inválido.';
                break;
              }
              case 'empty_token': {
                that.errorGeneral = 'No se pudo generar el token de pago.';
                break;
              }
              case 'invalid_param': {
                that.errorGeneral = 'Alguno de los datos ingresados es incorrecto.';
                break;
              }
            }
          }
        });
        this.loading = false;
      }
    } else {
      console.log("amount: "+this.form.get('total_operacion').value);
      console.log("user_id: "+this.personaId);

      if (this.form.get('tipo_tarjeta').value != 1){
        this.form.get('installments').setValue(1);
      }


      const body = {
        amount: +this.form.get('total_operacion').value.toString().replace(",",""),
        //amount: +this.form.get('total_operacion').value,
        email: this.form.get('user_email').value,
        user_id: this.personaId,
        personaId: this.personaId,
        tipoTarjeta: this.form.get('tipo_tarjeta').value,
        numeroTarjeta: this.form.get('card_number').value,
        response: response,
        tipoImponible: null,
        claveImponible: null,
        impuesto: null,
        concepto: null,
        transactionId: this.personaId + '_' + moment().format('DDMMYYHHmmss'),
        installments: this.form.get('installments').value
      };
      this.procesarPagoSubscription = this.pagoTarjetaService.generarPago(body)
        .subscribe((response) => {
          console.log(response);
          // EL PAGO FUE EXITOSO, retorno el evento con los datos
          response.email = this.form.get('user_email').value;
          response.numeroTarjeta = this.form.get('card_number').value;
          response.tipoTarjeta = this.form.get('tipo_tarjeta').value;
          this.loading = false;
          this.pagoExitoso.emit(response);
        }, (error) => {
          console.log(error);
          switch(error.status) {
            case 405: {
              this.errorGeneral = `El pago con su tarjeta fué RECHAZADO. Consulte con la entidad de su tarjeta de crédito<br/>
                Motivo: ${error.error.status_details.error.type}: ${error.error.status_details.error.reason.description}`;
              break;
            }
            case 400: {
              this.errorGeneral = 'Alguno de los datos ingresados son incorrectos';
              break;
            }
            case 401: {
              this.errorGeneral = 'Hubo un error procesando su pago. Por favor, intente nuevamente más tarde.';
              break;
            }
            case 402: {
              this.errorGeneral = 'Alguno de los datos ingresados son inválidos.';
              break;
            }
            case 404: {
              this.errorGeneral = 'Alguno de los datos necesarios está incompleto o es inexistente.';
              break;
            }
            case 409: {
              this.errorGeneral = 'Fallo en la comunicación con el servidor. Por favor, intente nuevamente más tarde.'
              break;
            }
            default: {
              this.errorGeneral = 'Hubo un error procesando su pago. <br/>' +
                'Por favor, Revise los datos de su tarjeta o intente nuevamente más tarde.'
            }
          }
          this.loading = false;
          this.disabled = false;
          this._scrollToService.scrollTo(this.config);
        });
    }
  }

  ngOnDestroy(): void {
    if(this.procesarPagoSubscription) {
      this.procesarPagoSubscription.unsubscribe();
    }
  }
}
