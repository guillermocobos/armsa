export class ConsultaTransaccionesDetalleModel {
    numeroOperacion: string;
    identificacion: string;
    impuestoAbrev: string;
    impuesto: string;
    rectificativa: string;
    periodo: string;
    montoDeuda: number;
    montoOperacion: number;
    constructor(obj?: any) {
      this.numeroOperacion = obj.NUMEROOPERACION || '';
      this.identificacion = obj.IDENTIFICACION || '';
      this.impuestoAbrev = obj.IMPUESTO_ABREV || '';
      this.impuesto = obj.IMPUESTO || '';
      this.rectificativa = obj.RECTIFICATIVA || '';
      this.periodo = obj.PERIODO || '';
      this.montoDeuda = obj.MONTODEUDA || '';
      this.montoOperacion = obj.MONTOOPERACION || '';
    }
  }