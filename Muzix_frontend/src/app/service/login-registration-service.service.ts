import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../component/user-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginRegistrationServiceService {

  private loginUrl = 'http://localhost:8090/api/user/login';
  private registerUrl = 'http://localhost:8090/api/user/register';

  constructor(private httpclient: HttpClient) { }

  login(userInfo: UserInfo): Observable<any> {
    return this.httpclient.post<any>(this.loginUrl, userInfo);
  }

  register(userInfo: UserInfo): Observable<any> {
    return this.httpclient.post<any>(this.registerUrl, userInfo);
  }

}
