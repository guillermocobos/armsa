export class PadronPyPModel {
  identificacion: string;
  nombreCompleto: string;
  claveImponible: string;
  tipoImponible: string;
  objeto: string;
  padron: string;

  constructor(obj?: any) {
    this.identificacion = obj.IDENTIFICACION || '';
    this.nombreCompleto = obj.NOMBRE_COMPLETO || '';
    this.claveImponible = obj.CLAVE || '';
    this.tipoImponible = obj.TIPO_IMPONIBLE || '';
    this.padron = obj.IDENTIFICACION.substring(0, obj.IDENTIFICACION.indexOf('='));
    this.objeto = obj.IDENTIFICACION.substring(obj.IDENTIFICACION.indexOf('=') + 1);
  }
}
