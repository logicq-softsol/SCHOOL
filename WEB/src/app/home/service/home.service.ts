import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import "rxjs";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }




  uploadProfileImage(imageData: File) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", undefined);
    headers.append("Access-Control-Allow-Origin", "*");
    let httpOptions = { headers: headers };
    const file: FormData = new FormData();
    file.append("file", imageData, imageData.name);
    return this.http.post(
      environment.baseUrl + "api/uploadFile",
      file,
      httpOptions
    );
  }

}
