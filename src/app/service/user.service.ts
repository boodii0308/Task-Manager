import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserItem } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BASE_URL_USER ='https://localhost:44336/api/user';
  headersCom = {'Access-Control-Allow-Origin': 'https://localhost:44336', 'Content-Type': 'application/json', 'No-Auth': 'True'};
  users: UserItem[] = [];
  
  constructor(private httpClient: HttpClient) {
      
  }
  getUsers(): Observable<UserItem[]>{
      return this.httpClient.get<UserItem[]>(this.BASE_URL_USER, {headers: this.headersCom});
  }
  getUser(val: UserItem){
    let curr = JSON.parse(JSON.stringify(val));
    return this.httpClient.get<UserItem>(this.BASE_URL_USER);
}
  addUser(val: UserItem){
    debugger
    let user = JSON.stringify(val);
    console.log(user);
      debugger
      return this.httpClient.post<UserItem>(this.BASE_URL_USER, user, {headers: this.headersCom})
      .subscribe(data =>{
        console.log(data);
      });
  }
  updateUser(val: UserItem){
      return this.httpClient.put(this.BASE_URL_USER, val);
  }
  deleteUsere(val: number){
      return this.httpClient.delete(this.BASE_URL_USER +'/'+val);
  }
}
