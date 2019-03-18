import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { TokenStorage } from '../core/token.storage';
import { Activation } from '../public/model/product-detail';
import { LoginDetail } from '../public/model/login-detail';
import { UserDetail } from '../public/model/user-detail';
import { ReplaySubject } from 'rxjs';
import { License } from 'src/app/public/model/license';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  public userDetail = new ReplaySubject<UserDetail>(1);

  constructor(private http: HttpClient) { }


  
  getUserDetail() {
    return this.userDetail.asObservable();
  }

  public changeUserDetail(userDetail: UserDetail) {
    this.userDetail.next(userDetail);
  }


  login(loginDetail: LoginDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/login', loginDetail, httpOptions);
  }

  logout() {
    this.authenticationState.next(false);
  }

  isAuthenticate() {
    return this.authenticationState.value;
  }

  checkValidateProduct() {
    return this.http.get(environment.baseUrl + 'api/validateProduct');
  }

  activateProduct(key: License) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/activateProduct', key, httpOptions);
  }
  
  loadRole() {
    return this.http.get('assets/data/role.json');
  }

  loadUser() {
    return this.http.get(environment.baseUrl + 'api/load');
  }

  registerUserForProduct(login: LoginDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/userRegister', login, httpOptions);
  }
  

}
