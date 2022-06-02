import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenItem } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  readonly BASE_URL_TOKEN ='https://localhost:44336/token';
  headersCom = {'Access-Control-Allow-Origin': 'https://localhost:44336/token', 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'};
  token: string = "";
  constructor(private httpClient: HttpClient) {
    
  }

  saveLogin(loginData: any):Observable<any>{
    var data = "grant_type=password&username="+loginData.username+"&password="+loginData.password;
    return this.httpClient.post(this.BASE_URL_TOKEN, data, {headers: this.headersCom});
  }
   public ngOnDestroy(): void {
   }

}