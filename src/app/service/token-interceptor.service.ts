import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(req.headers.get('No-Auth') == "True")
        {
          // debugger
          return next.handle(req.clone());
        }
      else{
        var headerss = {'Access-Control-Allow-Origin': 'https://localhost:44336', 'Content-Type': 'application/json','Authorization': 'Bearer' + localStorage.getItem('token')};
        var token = "Bearer " + localStorage.getItem('token');
        // debugger
        const clonedreq = req.clone({
          setHeaders: {
           'Authorization': token
          }
        });
        return next.handle(clonedreq);
      }
  }
}
