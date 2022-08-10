export class ImpuestoInscriptoModel {

  impuesto: string;
  impuestoDescripcion: string;

  constructor(obj?: any) {
    this.impuesto            = obj.IMPUESTO || '';
    this.impuestoDescripcion = obj.IMPUESTO_DESCR || '';
  }
}
