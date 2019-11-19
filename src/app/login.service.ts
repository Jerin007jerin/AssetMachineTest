import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  public LogIn(Userinfo:Login):Observable<any>
  {
    return this.http.get(environment.baseUrl +'/logintbls?name=' +Userinfo.uname+ '&pass='+Userinfo.pass+'&type='+Userinfo.utype)
  }
}
