export class ContribuyenteModel {
  categoria: string;
  cuit: string;
  email: string;
  estadoCivil: string;
  fechaInscripcion: string;
  fechaNacimiento: string;
  fechaSares: string;
  grupo: string;
  naturalezaJuridica: string;
  nombreCompleto: string;
  numeroDocumento: string;
  numeroInscripcion: string;
  objeto: string;
  padron: string;
  personeria: string;
  razonSocial: string;
  sexo: string;
  tipoContribuyente: string;
  tipoContribuyenteAbrev: string;
  tipoDocumento: string;


  constructor(obj?: any) {
    this.categoria = obj.categoria || '';
    this.cuit = obj.cuit || '';
    this.email = obj.email || '---';
    this.estadoCivil = obj.estado_civil || '';
    this.fechaInscripcion = obj.fecha_inscripcion || '';
    this.fechaNacimiento = obj.fecha_nacimiento || '';
    this.fechaSares = obj.fecha_sares || '';
    this.grupo = obj.grupo || '';
    this.naturalezaJuridica = obj.nat_juridica || '';
    this.nombreCompleto = obj.nombre_completo || '';
    this.numeroDocumento = obj.nro_documento || '';
    this.numeroInscripcion = obj.nro_inscripcion || '';
    this.objeto = obj.objeto || '';
    this.padron = obj.padron || '';
    this.personeria = obj.personeria || '';
    this.razonSocial = obj.razon_social || '';
    this.sexo = obj.sexo || '';
    this.tipoContribuyente = obj.tipo_contribuyente || '';
    this.tipoContribuyenteAbrev = obj.tipo_contribuyente_abrev || '';
    this.tipoDocumento = obj.tipo_documento || '';
  }
}
