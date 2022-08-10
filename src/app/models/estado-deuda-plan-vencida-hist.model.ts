export class EstadoDeudaPlanVencidaHistModel {

  impuestoAbrev: string;
  identificacion: string;
  anio: string;
  numeroCuota: string;
  fechaPrimerVencimiento: string;
  importePuro: string;
  moneda: string;
  importeActualizado: string;
  numero: string;
  planFacilidad: string;
  impuesto: string;
  conceptoObligacion: string;
  conceptoObligacionDescr: string;
  numeroObl: string;
  numeroObligacionImpuesto: string;
  numeroRectificativa: string;
  tipoImponible: string;
  claveImponible: string;
  numeroIntimacion: string;
  contribuyente: string;
  saldoReal: string;
  fechaGeneracion: string;
  intimacion: string;

  constructor(obj?: any) {
    this.impuestoAbrev = obj.IMPUESTO_ABREVH || '';
    this.identificacion = obj.IDENTIFICACION || '';
    this.anio = obj.ANIOH || '';
    this.numeroCuota = obj.NUMERO_CUOTAH || '';
    this.fechaPrimerVencimiento = obj.FECHA_PRIMER_VENCIMIENTOH || '';
    this.importePuro = obj.IMPORTE_PUROH || '';
    this.moneda = obj.MONEDAH || '';
    this.importeActualizado = obj.IMPORTE_ACTUALIZADO || '';
    this.numero = obj.NUMERO || '';
    this.planFacilidad = obj.PLAN_FACILIDADH || '';
    this.impuesto = obj.IMPUESTOH || '';
    this.conceptoObligacion = obj.CONCEPTO_OBLIGACIONH || '';
    this.conceptoObligacionDescr = obj.CONCEPTO_OBLIGACION_DESCRH || '';
    this.numeroObl = obj.NUMERO_OBL || '';
    this.numeroObligacionImpuesto = obj.NUMERO_OBLIGACION_IMPUESTOH || '';
    this.numeroRectificativa = obj.NUMERO_RECTIFICATIVAH || '';
    this.tipoImponible = obj.TIPO_IMPONIBLEH || '';
    this.claveImponible = obj.CLAVE_IMPONIBLEH || '';
    this.numeroIntimacion = obj.NUMERO_INTIMACIONH || '';
    this.intimacion = obj.INTIMACION || '';
    this.contribuyente = obj.CONTRIBUYENTE || '';
    this.saldoReal = obj.SALDO_REALH || '';
    this.fechaGeneracion = obj.FECHA_GENERACION || '';
  }
}
