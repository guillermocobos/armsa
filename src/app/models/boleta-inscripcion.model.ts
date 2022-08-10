export class BoletaInscripcionModel {

  presentacion: string;
  anio: string;
  numeroObligacion: string;
  fechaVencimiento: string;
  impuesto: string;
  conceptoObligacion: string;
  numeroObligacionImpuesto: string;
  numeroRectificativa: string;
  numeroCuota: string;
  nombre: string;
  formulario: string;
  cuitFormateado: string;
  domicilioFiscal: string;
  tipoContribuyente: string;
  numeroComprobante: string;
  codigoPostal: string;
  numeroInscripcionAnterior: string;
  codigoBarrasOriginal: string;
  codigoImpuesto: string;
  califica: string;
  identificacion: string;
  proximoNroRectificativa: string;
  codigoBarrasRectificativa: string;
  formularioAUsar: string;

  constructor(obj?: any) {
    this.presentacion = obj.PRESENTACION || '';
    this.anio = obj.ANIO || '';
    this.numeroObligacion = obj.NUMERO_OBLIGACION || '';
    this.fechaVencimiento = obj.FECHA_VENCIMIENTO || '';
    this.impuesto = obj.IMPUESTO || '';
    this.conceptoObligacion = obj.CONCEPTO_OBLIGACION || '';
    this.numeroObligacionImpuesto = obj.NUMERO_OBLIGACION_IMPUESTO || '';
    this.numeroRectificativa = obj.NUMERO_RECTIFICATIVA || '';
    this.numeroCuota = obj.NUMERO_CUOTA || '';
    this.nombre = obj.NOMBRE || '';
    this.formulario = obj.FORMULARIO || '';
    this.cuitFormateado = obj.CUIT_FORMATEADO || '';
    this.domicilioFiscal = obj.DOMICILIO_FISCAL || '';
    this.tipoContribuyente = obj.TIPO_CONTRIBUYENTE || '';
    this.numeroComprobante = obj.NUMERO_COMPROBANTE || '';
    this.codigoPostal = obj.CODIGO_POSTAL || '';
    this.numeroInscripcionAnterior = obj.NUMERO_INSCRIPCION_ANTERIOR || '';
    this.codigoBarrasOriginal = obj.CODIGO_BARRAS_ORIGINAL || '';
    this.codigoImpuesto = obj.CODIGO_IMPUESTO || '';
    this.califica = obj.CALIFICA || '';
    this.identificacion = obj.IDENTIFICACION || '';
    this.proximoNroRectificativa = obj.PROXIMO_NRO_RECTIFICATIVA || '';
    this.codigoBarrasRectificativa = obj.CODIGO_BARRAS_RECTIFICATIVA || '';
    this.formularioAUsar = obj.FORMULARIO_A_USAR || '';
  }
}
