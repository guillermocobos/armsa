export class ActividadInscriptaModel {
  actividad: string;
  desde: string;
  hasta: string;

  constructor(obj?: any) {
    this.actividad = obj.ACTIVIDAD || '';
    this.desde = obj.DESDE || '';
    this.hasta = obj.HASTA || '';
  }
}
