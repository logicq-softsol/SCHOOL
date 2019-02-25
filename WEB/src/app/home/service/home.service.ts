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




  uploadImages(imageData: File,entityId:any,entityType:string) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", undefined);
    headers.append("Access-Control-Allow-Origin", "*");
    let httpOptions = { headers: headers };
    const file: FormData = new FormData();
    file.append("file", imageData, imageData.name);
    file.append("entityId", entityId.toString());
    file.append("entityType",entityType);
    file.append("classId",null);
    file.append("subjectId",null);
    file.append("chapterId",null);
    return this.http.post(environment.baseUrl + "api/uploadFile", file, httpOptions);
  }

}
