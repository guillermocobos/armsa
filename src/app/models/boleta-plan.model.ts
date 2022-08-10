export class BoletaPlanModel {

  cantidadCuotas: string;
  nroAcogimiento: string;
  datosExpendiente: string;
  cuit: string;
  razonSocial: string;
  anio: string;
  cuota: string;
  descripcionImpuesto: string;
  fechaVencimientoOriginal: string;
  fechaVencimiento: string;
  importeOriginal: string;
  importeActualizado: string;
  recargo: string;
  importeEnLetras: string;
  codigoBarras: string;
  estadoCuota: string;

  constructor(obj?: any) {
    this.cantidadCuotas = obj.CANTIDAD_DE_CUOTAS || '';
    this.nroAcogimiento = obj.NUMERO_ACOGIMIENTO || '';
    this.datosExpendiente = obj.DATOS_DEL_EXPEDIENTE || '';
    this.cuit = obj.EL_CUIT || '';
    this.razonSocial = obj.RAZON_SOCIAL || '';
    this.anio = obj.EL_ANIO || '';
    this.cuota = obj.LA_CUOTA || '';
    this.descripcionImpuesto = obj.DESCRIPCION_IMPUESTO || '';
    this.fechaVencimientoOriginal = obj.FECHA_VENCIMIENTO_ORIGINAL || '';
    this.fechaVencimiento = obj.FECHA_VENCIMIENTO || '';
    this.importeOriginal = obj.IMPORTEORIGINAL || '';
    this.importeActualizado = obj.IMPORTE_ACTUALIZADO || '';
    this.recargo = obj.RECARGO || '';
    this.importeEnLetras = obj.IMPORTE_EN_LETRAS || '';
    this.codigoBarras = obj.EL_CODIGO_DE_BARRAS || '';
    this.estadoCuota = obj.ESTADO_CUOTA || '';
  }
}
