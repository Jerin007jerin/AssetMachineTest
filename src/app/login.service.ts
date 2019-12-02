import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserReg } from './user-reg';
import { userInfo } from 'os';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  public LogIn(Userinfo:Login):Observable<any>
  {
    localStorage.setItem('ACCESS_TOKEN',"access_token");
    localStorage.setItem('user',Userinfo.uname);
    return this.http.get(environment.baseUrl +'/LoginTbls?user='+Userinfo.uname+'&pass='+Userinfo.pass)
  }
  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
   
  }
  public Logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    
  }

  /*public userreg(user: UserReg): Observable<any> {
    return this.http.post(environment.baseUrl + '/UserTbls',user);
  }*/
}
