export class EstadoDeudaPlanVencidaModel {

  tipo: string;
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

  constructor(obj?: any) {
    this.tipo = obj.TIPO || '';
    this.impuestoAbrev = obj.IMPUESTO_ABREV || '';
    this.identificacion = obj.IDENTIFICACION || '';
    this.anio = obj.ANIO || '';
    this.numeroCuota = obj.NUMERO_CUOTA || '';
    this.fechaPrimerVencimiento = obj.FECHA_PRIMER_VENCIMIENTO || '';
    this.importePuro = obj.IMPORTE_PURO || '';
    this.moneda = obj.MONEDA || '';
    this.importeActualizado = obj.IMPORTE_ACTUALIZADO || '';
    this.numero = obj.NUMERO || '';
    this.planFacilidad = obj.PLAN_FACILIDAD || '';
    this.impuesto = obj.IMPUESTO || '';
    this.conceptoObligacion = obj.CONCEPTO_OBLIGACION || '';
    this.conceptoObligacionDescr = obj.CONCEPTO_OBLIGACION_DESCR || '';
    this.numeroObl = obj.NUMERO_OBL || '';
    this.numeroObligacionImpuesto = obj.NUMERO_OBLIGACION_IMPUESTO || '';
    this.numeroRectificativa = obj.NUMERO_RECTIFICATIVA || '';
    this.tipoImponible = obj.TIPO_IMPONIBLE || '';
    this.claveImponible = obj.CLAVE_IMPONIBLE || '';
    this.numeroIntimacion = obj.NUMERO_INTIMACION || '';
    this.contribuyente = obj.CONTRIBUYENTE || '';
    this.saldoReal = obj.SALDO_REAL || '';
    this.fechaGeneracion = obj.FECHA_GENERACION || '';
  }
}
