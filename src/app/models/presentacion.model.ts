export class PresentacionModel {
  formulario: string;
  tipoImponible: string;
  claveImponible: string;
  anio: string;
  periodo: string;
  impuesto: string;
  conceptoObligacion: string;
  numeroObligacionImpuesto: string;
  numeroRectificativa: string;
  numeroCuota: string;
  fechaPresentacion: string;
  importe: string;
  textoPresentacion: string;

  constructor(obj?: any) {
    this.formulario = obj.FORMULARIO || '';
    this.impuesto = obj.IMPUESTO || '';
    this.conceptoObligacion = obj.CONCEPTO_OBLIGACION || '';
    this.numeroObligacionImpuesto = obj.NUMERO_OBLIGACION_IMPUESTO || '';
    this.numeroRectificativa = obj.NUMERO_RECTIFICATIVA || '';
    this.tipoImponible = obj.TIPO_IMPONIBLE || '';
    this.claveImponible = obj.CLAVE_IMPONIBLE || '';
    this.fechaPresentacion = obj.FECHA_PRESENTACION || '';
    this.anio = obj.ANIO || '';
    this.periodo = obj.PERIODO || '';
    this.numeroCuota = obj.NUMERO_CUOTA || '';
    this.importe = obj.IMPORTE || '';
    this.textoPresentacion = obj.TEXTO_PRESENTACION || '';
  }
}
