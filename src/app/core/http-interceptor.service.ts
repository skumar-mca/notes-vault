import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as lodash from 'lodash';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let userToken = lodash.get(JSON.parse(localStorage.getItem('u-p') || '{}'), 'token', null);
    let authReq = req;
    if (userToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', userToken)
      });
    }

    //return next.handle(authReq);

    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (lodash.get(event, 'body.message', '') === 'Invalid Token') {
            this.router.navigateByUrl('/admin/login');
          }
          //console.log('event--->>>', event);
        }
        return event;
      }))
  }
}
