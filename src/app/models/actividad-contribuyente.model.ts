export class ActividadContribuyenteModel {
  actividad: string;
  actividadDescripcion: string;
  inscriptoDesde: string;

  constructor(obj?: any) {
    this.actividad = obj.ACTIVIDAD || '';
    this.actividadDescripcion = obj.ACTIVIDAD_DESCRI || '';
    this.inscriptoDesde = obj.INSCRIPTO_DESDE || '';
  }
}
