export class EstadoDeudaCabeceraModel {

  libreDeudaId: string;
  anioLibreDeuda: string;
  tipoImponible: string;
  claveImponible: string;
  tipoImponibleAbrev: string;
  identificacionLarga: string;
  impuTasa: string;
  fechaEmision: string;
  cuit: string;
  tipoDocumento: string;
  numeroDocumento: string;
  razonSocial: string;
  fechaCalculoDeuda: string;
  tieneActividades: string;
  contribuyenteId: string;
  fechaBaja: string;
  nroLibreDeuda: string;
  motivoBaja: string;

  constructor(obj?: any) {
    this.libreDeudaId = obj.LIBRE_DEUDA_ID || '';
    this.anioLibreDeuda = obj.ANIO_LIBRE_DEUDA || '';
    this.tipoImponible = obj.TIPO_IMPONIBLE || '';
    this.claveImponible = obj.CLAVE_IMPONIBLE || '';
    this.tipoImponibleAbrev = obj.TIPO_IMPONIBLE_ABREV || '';
    this.identificacionLarga = obj.IDENTIFICACION_LARGA || '';
    this.impuTasa = obj.IMPU_TASA || '';
    this.fechaEmision = obj.FECHA_EMISION || '';
    this.cuit = obj.CUIT || '';
    this.tipoDocumento = obj.TIPO_DOCUMENTO || '';
    this.numeroDocumento = obj.NUMERO_DOCUMENTO || '';
    this.razonSocial = obj.RAZON_SOCIAL || '';
    this.fechaCalculoDeuda = obj.FECHA_CALCULO_DEUDA || '';
    this.tieneActividades = obj.TIENE_ACTIVIDADES || '';
    this.contribuyenteId = obj.CONTRIBUYENTE_ID || '';
    this.fechaBaja = obj.FECHA_BAJA || '';
    this.nroLibreDeuda = obj.NRO_LIBRE_DEUDA || '';
    this.motivoBaja = obj.MOTIVO_BAJA || '';
  }
}
