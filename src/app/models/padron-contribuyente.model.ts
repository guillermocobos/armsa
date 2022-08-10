import { ActividadContribuyenteModel } from './actividad-contribuyente.model';
import { PeriodoInscripcionModel } from './periodo-inscripcion.model';

export class PadronContribuyenteModel {
  claveImponible: string;
  tipoImponible: string;
  padron: string;
  objeto: string;
  grupo: string;
  categoria: string;
  categoria2009: string;
  domicilioFinal: string;
  actividadesPrincipales: ActividadContribuyenteModel[];
  actividadesSecundarias: ActividadContribuyenteModel[];
  periodosInscripcion: PeriodoInscripcionModel[];
  catastro: string;
  categoriaTgi: string;

  constructor(obj?: any) {
    this.claveImponible = obj.CLAVE || '';
    this.tipoImponible = obj.TIPO_IMPONIBLE || '';
    this.padron = obj.COL01 || '';
    this.objeto = obj.COL02 || '';
    this.grupo = obj.COL03 || '';
    this.categoria = obj.COL04 || '';
    this.categoria2009 = obj.COL13 || '';
    this.domicilioFinal = obj.DOMICILIO_FINAL || '';
    this.catastro = obj.CATASTRO || '---';
    this.categoriaTgi = obj.CATEGORIA_TGI || '---';
    this.actividadesPrincipales = obj.ACTIVIDADES_PRINCIPALES || [];
    this.actividadesSecundarias = obj.ACTIVIDADES_SECUNDARIAS || [];
    this.periodosInscripcion = obj.PERIODOS_INSCRIPCION || [];
  }
}
