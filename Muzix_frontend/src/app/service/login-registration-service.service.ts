import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../component/user-info';

@Injectable({
  providedIn: 'root'
})
export class LoginRegistrationServiceService {

  private authenticateUrl = 'http://localhost:8090/api/user/authenticate';
  private registerUrl = 'http://localhost:8090/api/user/register';

  constructor(private httpclient: HttpClient) { }

  authenticate(userInfo: UserInfo): Observable<any> {
    return this.httpclient.post<any>(this.authenticateUrl, userInfo, { responseType: 'text' as 'json' });
  }

  register(userInfo: UserInfo): Observable<any> {
    return this.httpclient.post<any>(this.registerUrl, userInfo);
  }

  logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('currentUser');
  }

}
