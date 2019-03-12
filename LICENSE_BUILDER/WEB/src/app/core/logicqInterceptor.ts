import { Component, OnInit, Inject, Injectable } from "@angular/core";
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpResponse} from "@angular/common/http";
import { Observable, ReplaySubject, BehaviorSubject } from "rxjs";
import { catchError, tap, map, finalize } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { TokenStorage } from "./token.storage";

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class LogicQIntercept implements HttpInterceptor {
  constructor(
    public snackBar: MatSnackBar,
    private tokenStorage: TokenStorage
  ) { }

  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request;
    if (this.tokenStorage.getToken() != null) {
      authReq = request.clone({
        headers: request.headers.set(
          TOKEN_HEADER_KEY,
          "Bearer " + this.tokenStorage.getToken()
        )
      });
    }
    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log("API return", event);

          }
        },
        (err: any) => {
          console.log(event);
          this.openErrorSnackBar(err.message, "CLOSE");
        }
      )
    );
  }


  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}
