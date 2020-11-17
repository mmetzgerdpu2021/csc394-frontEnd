/*
 * File Created: Wednesday, 10th June 2020 12:53:36 pm
 * Author: El Messoudi Zakaria (you@you.you)
 * -----
 * Last Modified: Wednesday, 10th June 2020 12:53:36 pm
 * Modified By: El Messoudi Zakaria (you@you.you>)
 * -----
 */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {isNullOrUndefined} from 'util';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private token: string;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userToken: string  = JSON.parse(sessionStorage.getItem('accessToken'));
    let accessToken: string;
    /*const addHeaderToReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + userToken)
    });*/
    if (!isNullOrUndefined(userToken)) {
      accessToken = userToken['accessToken'];
    }
    const customRequest = request.clone({
      setHeaders: {
        Authorization:
        'Bearer ' + accessToken
      },
    });

    return next.handle(customRequest);
  }
}
