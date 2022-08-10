import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './signin/authentication.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private auth: AuthenticationService;

    constructor(private inj: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.auth = this.inj.get(AuthenticationService);
        // Obtenemos el token
        const token = this.auth.getToken();
        if (token) {
            // Importante: modificamos de forma inmutable, haciendo el clonado de la petición
            const request = req.clone({headers: req.headers.set('Authorization', token)});
            // Pasamos al siguiente interceptor de la cadena la petición modificada
            return next.handle(request);
        }
        return next.handle(req);
    }
}
