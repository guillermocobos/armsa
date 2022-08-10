export class ConsultaTransaccionesModel {
    identificacion: string;
    fechaOperacion: string;
    descripcion: string;
    rechazada: string;
    estado: string;
    tipoOperacion: string;
    totalOperacion: number;
    constructor(obj?: any) {
      this.identificacion = obj.NUMERO_OPE || '';
      this.fechaOperacion = obj.FECHA_OPERACION || '';
      this.descripcion = obj.DESCRIPCION || '';
      this.rechazada = obj.RECHAZADA || '';
      this.estado = obj.ESTADO || '';
      this.tipoOperacion = obj.TIPOOPERACION || '';
      this.totalOperacion = obj.TOTALOPERACION || '';
    }
  }