import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs";
import { environment } from "../../../environments/environment";
import { ClassSetupDetail } from '../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../public/model/subject-setup-detail';
import { ChapterSetupDetail } from '../../public/model/chapter-setup-detail';


@Injectable({
  providedIn: 'root'
})
export class ContentMgmntService {

  constructor(private http: HttpClient) { }



  setupClassDetails(classDetails: ClassSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/classes', classDetails, httpOptions);
  }


  setupSubjectDetails(subjectDetails: SubjectSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/classes', subjectDetails, httpOptions);
  }


  setupChapterDetails(chapterDetail: ChapterSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/classes', chapterDetail, httpOptions);
  }

  getClassDetailList() {
    return this.http.get(environment.baseUrl + 'api/admin/classes');
  }


  getSubjectListForClass(classId: number) {
    return this.http.get(environment.baseUrl + 'api/admin/subjects/' + classId);
  }


  getChapterListForSubjectListForClass(classId: number, subjectId: number) {
    return this.http.get(environment.baseUrl + 'api/admin/chapters/' + classId + "/" + subjectId);
  }

}
