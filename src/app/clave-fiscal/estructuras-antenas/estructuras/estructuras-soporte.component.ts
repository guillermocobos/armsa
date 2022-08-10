import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../authentication/signin/authentication.service';
import { ClaveFiscalService } from '../../clave-fiscal.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {EstructurasAntenasService} from "../estructuras-antenas.service";
import * as moment from "moment";
import * as FileSaver from "file-saver";
import cuitValidator from "../../../shared/helpers/validators/cuit-validator";

declare const $: any;

@Component({
  selector: 'app-estructuras-soporte',
  templateUrl: './estructuras-soporte.component.html'
})
export class EstructurasSoporteComponent implements OnInit, OnDestroy {
  contribuyente;
  personaId;
  loading = false;

  mostrarCargaDDJJ = false;
  mostrarPadrones = true;
  instalacionActiva;
  mostrarEdit = false;
  newEditValue;
  loadingEdit = false;
  formEliminar: FormGroup;
  formAgregarEstructura: FormGroup;
  submittedEliminar = false;
  mostrarFormEliminar = false;
  mostrarMensajeEliminar;
  mostrarMensajeModificar;
  loadingEliminar = false;
  loadingImprimir = false;
  mostrarFormAgregarEstructura = false;
  submittedAgregarEstructura = false;
  submittedConsultaCuit = false;
  loadingCuit = false;
  mostrarCuit = false;
  mostrarRazonSocial = false;
  errorBuscarRazonSocial;

  fechaHoy = moment().format('DD/MM/YYYY');
  calles = [];
  tiposEstructuras = [];
  loadingGrabarEstructura = false;

  imprimirBajaSubscription: Subscription;

  dtOptions: DataTables.Settings = {
    pageLength: 10,
    pagingType: 'first_last_numbers',
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
    },
    columnDefs: [
      { orderable: false, targets: [6,8,9] }
    ],
    order: [[ 0, 'asc']]
  };
  dtTrigger: Subject<any>;
  instalaciones = [];
  instalacionesSubscription: Subscription;
  actualizarInstalacionSubscription: Subscription;
  eliminarInstalacionSubscription: Subscription;
  callesSubscription: Subscription;
  tiposEstructurasSubscription: Subscription;
  razonSocialSubscription: Subscription;
  agregarInstalacionSubscription: Subscription;
  valorAdicionalSubscription: Subscription;

  @BlockUI('visualizar-datos') blockVisualizarDatos: NgBlockUI;
  @BlockUI('cargando-calles') blockCargandoCalles: NgBlockUI;
  @ViewChild('eliminarInstalacionModal', {static: true}) eliminarInstalacionModal: ElementRef;
  @ViewChild('modificarInstalacionModal', {static: true}) modificarInstalacionModal: ElementRef;
  @ViewChild('agregarEstructuraModal', {static: true}) agregarEstructuraModal: ElementRef;

  constructor(
    private authService: AuthenticationService,
    private claveFiscalService: ClaveFiscalService,
    private fb: FormBuilder,
    private estructurasAntenasService: EstructurasAntenasService
  ) {}

  ngOnInit() {
    this.personaId = this.authService.getSessionUserId();
    this.contribuyente = this.authService.getContribuyenteSesion();
    this.consultarInstalaciones();
    this.formEliminar = this.fb.group({
      motivoEliminacion: [null, Validators.required]
    }, {updateOn: 'blur'});
    this.formAgregarEstructura = this.fb.group({
      ocm: [null, Validators.required],
      cuit: [null, cuitValidator],
      razonSocial: [null],
      latitud: [null, Validators.required],
      longitud: [null, Validators.required],
      calle: [null, Validators.required],
      puerta: [null, Validators.required],
      tipoEstructura: [null, Validators.required],
      estructuras: [null, Validators.required],
      metrosAdicionales: [null],
      valorAprobacion: [0.00],
      personaIdOCM: [null],
      fechaInstalacion: [moment().format('DD/MM/YYYY')]
    });

    this.formAgregarEstructura.get('ocm').valueChanges
      .subscribe(tipoContribuyente => {

        if (tipoContribuyente === '1') {
          this.formAgregarEstructura.get('cuit').setValidators([Validators.required]);
          this.formAgregarEstructura.get('razonSocial').setValidators([Validators.required]);
        } else {
          this.formAgregarEstructura.get('cuit').setValidators(null);
          this.formAgregarEstructura.get('razonSocial').setValidators(null);
        }

        this.formAgregarEstructura.get('cuit').updateValueAndValidity();
        this.formAgregarEstructura.get('razonSocial').updateValueAndValidity();
      });

    this.obtenerTiposEstructuras();
    this.obtenerCalles();
  }

  get fe() {
    return this.formEliminar.controls;
  }
  get fa() {
    return this.formAgregarEstructura.controls;
  }

  consultarInstalaciones() {
    this.loading = true;
    this.blockVisualizarDatos.start();
    this.instalaciones = [];

    this.dtTrigger = new Subject();
    this.instalacionesSubscription = this.estructurasAntenasService.getInstalacionesElectricas()
      .subscribe((data: any) => {
        console.log(data);
        this.instalaciones = data;
        this.loading = false;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);
        this.blockVisualizarDatos.stop();
      }, (err) => {
        console.error(err);
        this.blockVisualizarDatos.stop();
      });
  }


  modificarModal(instalacion) {
    this.instalacionActiva = instalacion;
    this.mostrarMensajeModificar = '¿Está seguro que desea modificar la cantidad de Antenas?'
    $(this.modificarInstalacionModal.nativeElement).modal('show');
  }

  modificar(instalacion) {
    this.newEditValue = instalacion.cantAntenas;
    this.mostrarEdit = true;
    $(this.modificarInstalacionModal.nativeElement).modal('hide');
  }

  cancelar(instalacion) {
    this.instalacionActiva = undefined;
    this.mostrarEdit = false;
  }

  guardarModificacion(instalacion) {
    const body = {
      estructuraId: instalacion.estructuraId,
      cantidad: this.newEditValue
    };
    this.loadingEdit = true;
    this.actualizarInstalacionSubscription = this.estructurasAntenasService.actualizarInstalacion(body)
      .subscribe((data: any) => {
        console.log(data);
        this.dtTrigger = new Subject();
        this.instalaciones = this.instalaciones.map((inst) => {
          if (inst.estructuraId === instalacion.estructuraId) {
            instalacion.cantAntenas = this.newEditValue;
          }
          return inst;
        });

        this.newEditValue = undefined;
        setTimeout(() => {
          this.dtTrigger.next(this.instalaciones);
        }, 100);
        this.mostrarEdit = false;
        this.instalacionActiva = undefined;
        this.loadingEdit = false;
        this.blockVisualizarDatos.stop();
      }, (err) => {
        console.error(err);
      });
  }

  verificarDeuda(instalacion) {
    const body = {
      estructuraId: instalacion.estructuraId
    };
    this.actualizarInstalacionSubscription = this.estructurasAntenasService.tieneDeudaEstructura(body)
      .subscribe((data: any) => {
        console.log(data);
        if (data.tieneDeuda) {
          // muestro cartel
          this.mostrarMensajeEliminar = 'No se puede borrar estructura ya que la misma posee deuda';
          this.mostrarFormEliminar = false;
        } else {
          // muestro formulario
          this.instalacionActiva = instalacion;
          this.mostrarMensajeEliminar = undefined;
          this.mostrarFormEliminar = true;
        }
        $(this.eliminarInstalacionModal.nativeElement).modal('show');
      }, (err) => {
        console.error(err);
      });
  }

  eliminarInstalacion(instalacion) {
    this.loadingEliminar = true;
    this.submittedEliminar = true;
    if (this.formEliminar.valid) {
      const body = {
        estructuraId: instalacion.estructuraId,
        motivoEliminacion: this.formEliminar.get('motivoEliminacion').value
      };
      this.eliminarInstalacionSubscription = this.estructurasAntenasService.eliminarEstructura(body)
        .subscribe((data: any) => {
          console.log(data);
          // muestro cartel
          this.consultarInstalaciones();
          this.mostrarMensajeEliminar = data.result || 'Se eliminó la estructura correctamente!';
          this.mostrarFormEliminar = false;
          this.instalacionActiva = undefined;
          this.loadingEliminar = false;
          this.submittedEliminar = false;
        }, (err) => {
          console.error(err);
          this.loadingEliminar = false;
          this.submittedEliminar = false;
          this.instalacionActiva = undefined;
        });
    } else {
      this.loadingEliminar = false;
    }
  }

  cerrarModalEliminacion() {
    this.mostrarMensajeEliminar = undefined;
    this.mostrarFormEliminar = false;
    this.instalacionActiva = undefined;
    $(this.eliminarInstalacionModal.nativeElement).modal('hide');
  }

  cerrarModalModificacion() {
    this.mostrarMensajeModificar = undefined;
    this.instalacionActiva = undefined;
    $(this.modificarInstalacionModal.nativeElement).modal('hide');
  }

  imprimir(instalacion) {
    this.instalacionActiva = instalacion;
    this.loadingImprimir = true;
    const tipoConstancia = instalacion.fechaBaja === null ? 'alta' : 'baja';
    const body = {
      estructuraId: instalacion.estructuraId,
      personaId: instalacion.personaId,
      empresaOcm: instalacion.empresaOcm,
      tipoConstancia: tipoConstancia
    };
    this.imprimirBajaSubscription = this.estructurasAntenasService.imprimir(body)
      .subscribe((response: any) => {
        this.loading = false;
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        FileSaver.saveAs(blob, `constancia_${tipoConstancia}_instalacion_${instalacion.estructuraId}.pdf`);
        this.loadingImprimir = false;
        this.instalacionActiva = undefined;
      });
  }

  onMostrarFormAgregarEstructura() {
    this.mostrarFormAgregarEstructura = true;
  }


  onCancelarAltaEstructura() {
    this.consultarInstalaciones();
    this.mostrarFormAgregarEstructura = false;
  }

  agregarEstructura() {
    this.loadingGrabarEstructura = true;
    this.submittedAgregarEstructura = true;
    if (this.formAgregarEstructura.valid) {
      let personaLogueada = 0;
      let personaIdOcm = 0;
      let usuarioLogueado = 0;
      if (this.formAgregarEstructura.get('ocm').value === '1') {
        personaLogueada = this.personaId;
      } else {
        usuarioLogueado = this.personaId;
        personaIdOcm = this.formAgregarEstructura.get('personaIdOCM').value;
      }
      const body = {
        personaId: personaLogueada,
        personaIdOCM: personaIdOcm,
        fechaInstalacion: this.formAgregarEstructura.get('fechaInstalacion').value,
        latitud: this.formAgregarEstructura.get('latitud').value,
        longitud: this.formAgregarEstructura.get('longitud').value,
        calle: this.formAgregarEstructura.get('calle').value,
        puerta: this.formAgregarEstructura.get('puerta').value,
        tipoEstructura: this.formAgregarEstructura.get('tipoEstructura').value,
        valorAprobacion: this.formAgregarEstructura.get('valorAprobacion').value,
        valorAdicional: this.formAgregarEstructura.get('metrosAdicionales').value || 0.00,
        claveImponible: null,
        estructuras: this.formAgregarEstructura.get('estructuras').value,
        usuarioLogueado: usuarioLogueado
      };
      this.agregarInstalacionSubscription = this.estructurasAntenasService.insertarInstalacion(body)
        .subscribe((data: any) => {
          console.log(data);
          // muestro cartel
          this.consultarInstalaciones();
          this.instalacionActiva = undefined;
          this.loadingGrabarEstructura = false;
          this.submittedAgregarEstructura = false;
          this.mostrarFormAgregarEstructura = false;
          $(this.agregarEstructuraModal.nativeElement).modal('show');
        }, (err) => {
          console.error(err);
          this.loadingGrabarEstructura = false;
          this.submittedAgregarEstructura = false;
          this.instalacionActiva = undefined;
        });
    } else {
      this.loadingGrabarEstructura = false;
    }
  }

  cerrarModalAgregarEstructura() {
    $(this.agregarEstructuraModal.nativeElement).modal('hide');
  }

  buscarRazonSocial() {
    this.loadingCuit = true;
    this.submittedConsultaCuit = true;
    if (this.formAgregarEstructura.get('cuit').valid) {
      this.razonSocialSubscription = this.estructurasAntenasService.recuperaRazonSocial(this.formAgregarEstructura.get('cuit').value)
        .subscribe((data: any) => {
          console.log(data);
          this.formAgregarEstructura.get('razonSocial').setValue(data.razonSocial.razonSocial);
          this.formAgregarEstructura.get('personaIdOCM').setValue(data.razonSocial.personaId);
          this.mostrarRazonSocial = true;
          this.loadingCuit = false;
          this.submittedConsultaCuit = false;
          this.errorBuscarRazonSocial = undefined;
        }, (err) => {
          this.loadingCuit = false;
          this.errorBuscarRazonSocial = err;
          this.mostrarRazonSocial = false;
        });
    } else {
      this.loadingCuit = false;
      this.mostrarRazonSocial = false;
    }
  }

  obtenerCalles() {
    if (this.calles.length === 0) {
      this.blockCargandoCalles.start();
      this.callesSubscription = this.estructurasAntenasService.obtenerCalles()
        .subscribe((data: any) => {
          this.calles = data;
          this.blockCargandoCalles.stop();
        }, (err) => {
          this.calles = [];
          this.blockCargandoCalles.stop();
        });
    }
  }

  obtenerTiposEstructuras() {
      this.tiposEstructurasSubscription = this.estructurasAntenasService.obtenerTiposEstructuras()
        .subscribe((data: any) => {
          this.tiposEstructuras = data;
        });
  }


  onOcmChange(event) {
    const mostrar = event.target.value === '1';
    this.mostrarCuit = mostrar;
    if (!mostrar) {
      this.formAgregarEstructura.get('cuit').setValue(undefined);
      this.formAgregarEstructura.get('razonSocial').setValue(undefined);
    }
  }

  estructurasValorAdicional(body) {
    this.valorAdicionalSubscription = this.estructurasAntenasService.estructurasValorAdicional(body)
      .subscribe((data: any) => {
        console.log(data);
        this.formAgregarEstructura.get('valorAprobacion').setValue(data.importe);
      }, (err) => {
        console.error(err);
      });
  }

  recalcularValorAprobacion() {
    const body = {
      valorAdicional: this.formAgregarEstructura.get('metrosAdicionales').value,
      codigo: this.formAgregarEstructura.get('tipoEstructura').value
    };
    if(body.valorAdicional && body.codigo) {
      this.estructurasValorAdicional(body);
    }
  }


  ngOnDestroy(): void {
    if (this.instalacionesSubscription) {
      this.instalacionesSubscription.unsubscribe();
    }
    if (this.actualizarInstalacionSubscription) {
      this.actualizarInstalacionSubscription.unsubscribe();
    }
    if (this.eliminarInstalacionSubscription) {
      this.eliminarInstalacionSubscription.unsubscribe();
    }
    if (this.imprimirBajaSubscription) {
      this.imprimirBajaSubscription.unsubscribe();
    }
    if (this.callesSubscription) {
      this.callesSubscription.unsubscribe();
    }
    if (this.tiposEstructurasSubscription) {
      this.tiposEstructurasSubscription.unsubscribe();
    }
    if (this.razonSocialSubscription) {
      this.razonSocialSubscription.unsubscribe();
    }
    if (this.agregarInstalacionSubscription) {
      this.agregarInstalacionSubscription.unsubscribe();
    }
    if (this.valorAdicionalSubscription) {
      this.valorAdicionalSubscription.unsubscribe();
    }
  }

}
