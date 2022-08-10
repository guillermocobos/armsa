export class CuentaUnicaPlanModel {
  identificacion: string;
  planFacilidad: string;
  caduco: string;

  constructor(obj?: any) {
    this.identificacion = obj.IDENTIFICACION || '';
    this.planFacilidad = obj.PLAN_FACILIDAD || '';
    this.caduco = obj.CADUCO || '';
  }
}
