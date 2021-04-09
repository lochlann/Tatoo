import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        //const authToken = this.authenticationService.get
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser?.token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }


    //    private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    //       Promise<HttpEvent<any>> {
    //     const token = await this.authenticationService.getAccessToken();
    //     let changedRequest = request;
    //     // HttpHeader object immutable - copy values
    //     const headerSettings: {[name: string]: string | string[]; } = {};

    //     for (const key of request.headers.keys()) {
    //       headerSettings[key] = request.headers.getAll(key);
    //     }
    //     if (token) {
    //       headerSettings['Authorization'] = 'Bearer ' + token;
    //     }
    //     headerSettings['Content-Type'] = 'application/json';
    //     const newHeader = new HttpHeaders(headerSettings);

    //     changedRequest = request.clone({
    //       headers: newHeader});
    //     return next.handle(changedRequest).toPromise();
    //   }
}