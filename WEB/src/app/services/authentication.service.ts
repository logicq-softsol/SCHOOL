import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { TokenStorage } from '../core/token.storage';
import { Activation } from '../public/model/product-detail';
import { LoginDetail } from '../public/model/login-detail';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }


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

  activateProduct(product: Activation) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/activateProduct', product, httpOptions);
  }
  
  loadRole() {
    return this.http.get('assets/data/role.json');
  }

  loadUser() {

  }
}
