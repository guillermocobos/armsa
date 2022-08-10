export class EstadoDeudaPlanCuotaModel {

  tipo: string;
  planFacilidad: string;
  numeroObligacionImpuesto: string;
  numeroRectificativa: string;
  cuota: string;
  fechaVencimiento: string;
  importeCuota: string;
  fechaPago: string;
  importe: string;
  importePagado: string;
  moneda: string;
  observaciones: string;

  constructor(obj?: any) {
    this.tipo = obj.TIPO || '';
    this.planFacilidad = obj.PLAN_FACILIDAD || '';
    this.numeroObligacionImpuesto = obj.NUMERO_OBLIGACION_IMPUESTO || '';
    this.numeroRectificativa = obj.NUMERO_RECTIFICATIVA || '';
    this.cuota = obj.CUOTA !== undefined ? obj.CUOTA : '';
    this.fechaVencimiento = obj.FECHA_VENCIMIENTO || '';
    this.importeCuota = obj.IMPORTE_CUOTA || '';
    this.fechaPago = obj.FECHA_PAGO || '';
    this.importe = obj.IMPORTE || '';
    this.importePagado = obj.IMPORTE_PAGADO || '';
    this.moneda = obj.MONEDA || '';
    this.observaciones = obj.OBSERVACIONES || '';
  }
}
