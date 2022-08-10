export class CabeceraPypModel {
  identificacion: string;
  fechaAlta: string;
  anio: string;
  transaccionId: string;

  constructor(obj?: any) {
    this.identificacion = obj.IDENTIFICACION || '';
    this.fechaAlta = obj.FECHA_ALTA || '';
    this.anio = obj.ANIO || '';
    this.transaccionId = obj.TRANSACCION_ID || '';
  }
}
