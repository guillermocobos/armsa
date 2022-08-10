export class PresentacionDDJJModel {

  tabla: string;
  personaId: string;
  impuesto: string;
  conceptoObligacion: string;
  numeroObligacionImpuesto: string;
  numeroRectificativa: string;
  descripcionImpuesto: string;
  impuestoAbrev: string;
  descripcionConcepto: string;
  fechaPresentacion: string;
  clave: string;
  tipoImponible: string;
  claveImponible: string;
  anio: string;
  periodo: string;
  fechaProceso: string;
  formularioPresentado: string;
  razonSocial: string;
  cuit: string;
  error: string;
  transaccionId: string;
  errores: [];

  constructor(obj?: any) {
    this.tabla = obj.TABLA || '';
    this.personaId = obj.PERSONA_ID || '';
    this.impuesto = obj.IMPUESTO || '';
    this.conceptoObligacion = obj.CONCEPTO_OBLIGACION || '';
    this.numeroObligacionImpuesto = obj.NUMERO_OBLIGACION_IMPUESTO || '';
    this.numeroRectificativa = obj.NUMERO_RECTIFICATIVA || '';
    this.descripcionImpuesto = obj.DESCRIPCION_IMPUESTO || '';
    this.impuestoAbrev = obj.IMPUESTO_ABREV || '';
    this.descripcionConcepto = obj.DESCRIPCION_CONCEPTO || '';
    this.fechaPresentacion = obj.FECHA_PRESENTACION || '';
    this.clave = obj.CLAVE || '';
    this.tipoImponible = obj.TIPO_IMPONIBLE || '';
    this.claveImponible = obj.CLAVE_IMPONIBLE || '';
    this.anio = obj.ANIO || '';
    this.periodo = obj.PERIODO || '';
    this.fechaProceso = obj.FECHA_PROCESO || '';
    this.formularioPresentado = obj.FORMULARIO_PRESENTADO || '';
    this.razonSocial = obj.RAZON_SOCIAL || '';
    this.cuit = obj.CUIT || '';
    this.error = obj.ERROR || '';
    this.transaccionId = obj.TRANSACCION_ID || '';
    this.errores = obj.ERRORES || [];
  }
}
