export class Noticia {
  id: string;
  titulo: string;
  slug: string;
  contenido: string;
  fechaPublicacion: string;
  resumen?: string;
  subtitulo?: string;
  imagenPortada?: string;

  constructor(obj?: any) {
    this.id = obj.NOTICIA_ID || '';
    this.titulo = obj.TITULO || '';
    this.slug = obj.SLUG || '';
    this.contenido = obj.CONTENIDO || '';
    this.fechaPublicacion = obj.FECHA_PUBLICACION || '';
    this.resumen = obj.RESUMEN || '';
    this.subtitulo = obj.SUBTITULO || '';
    this.imagenPortada = obj.IMAGEN_PORTADA || '';
  }
}
