export class PeriodoInscripcionModel {

  codigo: string;
  descripcion: string;
  fechaInscripcion: string;

  constructor(obj?: any) {
    this.codigo = obj.CODIGO || '';
    this.descripcion = obj.DESCRIPCION || '';
    this.fechaInscripcion = obj.FECHA_INSCRIPCION || '';
  }
}
