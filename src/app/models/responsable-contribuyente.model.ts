import { ActividadContribuyenteModel } from './actividad-contribuyente.model';

export class ResponsableContribuyenteModel {
  cargo: string;
  razonSocial: string;
  tipoDocumentoAbrev: string;
  numeroDocumento: string;
  cuit: string;

  constructor(obj?: any) {
    this.cargo = obj.CARGO || '';
    this.razonSocial = obj.RAZON_SOCIAL || '';
    this.tipoDocumentoAbrev = obj.TIPO_DOCUMENTO_ABREV || '';
    this.numeroDocumento = obj.NUMERO_DOCUMENTO || '';
    this.cuit = obj.CUIT || '';
  }
}
