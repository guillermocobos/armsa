export class OpemTributoConceptoModel {
  col01: string;
  col02: string;
  claveImponible: string;
  tipoImponible: string;
  conceptoObligacion: string;
  impuesto: string;
  identificacion: string;
  descripcion: string;
  id: string;

  constructor(obj?: any) {
    this.col01 = obj.COL01 || '';
    this.col02 = obj.COL02 || '';
    this.claveImponible = obj.CLAVE || '';
    this.tipoImponible = obj.TIPO_IMPONIBLE || '';
    this.impuesto = obj.IMPUESTO || '';
    this.conceptoObligacion = obj.CONCEPTO_OBLIGACION || '';
    this.identificacion = obj.IDENTIFICACION || '';
    this.descripcion = obj.DESCRIPCION || '';
    this.id = this.claveImponible + this.impuesto + this.conceptoObligacion;
  }
}
