import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Util } from '../util';
import { Noticia } from './noticia.model';

@Injectable()
export class NoticiasService {

  apiUrl = environment.API_SERVER;

  constructor(private http: HttpClient, private util: Util) {
  }

  crearNoticia(body, portada?) {

    const formData = this.util.createFormData(body);

    if (portada) {
      formData.append('imagen_portada', portada.file, portada.file.name);
    }
    return this.http.post(`${this.apiUrl}/noticias` , formData)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(error);
    return throwError(error);
  }

  getNoticiasPortada() {
    return this
      .http
      .get(`${this.apiUrl}/noticias`)
      .pipe(
        map((response: any) => {
          return response.map(noticia => {
            return new Noticia(noticia);
          });
        }),
        catchError(this.handleError)
      );
  }

  getNoticiaBySlug(slug) {
    return this
      .http
      .get(`${this.apiUrl}/noticias/by-slug/${slug}`)
      .pipe(
        map((noticia: any) => {
            return new Noticia(this.convertirContenidoNoticia(noticia));
        }),
        catchError(this.handleError)
      );
  }

  private convertirContenidoNoticia(noticia) {
    const regexp = new RegExp('src="/noticias', 'g');
    noticia.CONTENIDO = noticia.CONTENIDO.replace(regexp, `src="${environment.STATIC_SERVER}/noticias`);
    return noticia;
  }
}
