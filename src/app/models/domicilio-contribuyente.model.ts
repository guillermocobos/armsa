export class DomicilioContribuyenteModel {
  altaModificacion: string;
  barrio: string;
  calle: string;
  calleBarrio: string;
  casa: string;
  codigoPostal: string;
  departamento: string;
  divisionGeografica: string;
  dspBarrio: string;
  dspCalle: string;
  dspDivisionGeografica: string;
  dspProvincia: string;
  manzana: string;
  piso: string;
  provincia: string;
  puerta: string;
  telefono: string;


  constructor(obj?: any) {
    this.altaModificacion = obj.alta_modificacion || '';
    this.barrio = obj.barrio || '';
    this.calle = obj.calle || '';
    this.calleBarrio = obj.calle_barrio || '';
    this.casa = obj.casa || '';
    this.codigoPostal = obj.codigo_postal || '';
    this.departamento = obj.departamento || '';
    this.divisionGeografica = obj.division_geografica || '';
    this.dspBarrio = obj.dsp_barrio || '';
    this.dspCalle = obj.dsp_calle || '';
    this.dspDivisionGeografica = obj.dsp_division_geografica || '';
    this.dspProvincia = obj.dsp_provincia || '';
    this.manzana = obj.manzana || '';
    this.piso = obj.piso || '';
    this.provincia = obj.provincia || '';
    this.puerta = obj.puerta || '';
    this.telefono = obj.telefono || '';
  }
}
