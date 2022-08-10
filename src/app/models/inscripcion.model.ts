export class InscripcionModel {

  identificacion: string;
  identificacion2: string;
  tipoImponible: string;
  claveImponible: string;
  codigoImp: string;

  constructor(obj?: any) {
    this.identificacion = obj.IDENTIFICACION || '';
    this.identificacion2 = obj.IDENTIFICACION2 || '';
    this.tipoImponible = obj.TIPO_IMPONIBLE || '';
    this.claveImponible = obj.CLAVE_IMPONIBLE || '';
    this.codigoImp = obj.CODIGO_IMPUESTO || '';
  }
}
