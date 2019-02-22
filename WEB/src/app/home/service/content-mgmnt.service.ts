import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs";
import { environment } from "../../../environments/environment";
import { ClassSetupDetail } from '../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../public/model/subject-setup-detail';
import { ChapterSetupDetail } from '../../public/model/chapter-setup-detail';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentMgmntService {

  public classSetupDetail = new ReplaySubject<ClassSetupDetail>(1);
  public subjectDetail = new ReplaySubject<SubjectSetupDetail>(1);

  constructor(private http: HttpClient) { }



  getClassSetupDetail() {
    return this.classSetupDetail.asObservable();
  }

  public changeClassSetupDetail(classSetupDetail: ClassSetupDetail) {
    this.classSetupDetail.next(classSetupDetail);
  }



  getSubjectDetail() {
    return this.subjectDetail.asObservable();
  }

  public changeSubjectDetail(subjectDetail: SubjectSetupDetail) {
    this.subjectDetail.next(subjectDetail);
  }


  setupClassDetails(classDetails: ClassSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/classes', classDetails, httpOptions);
  }



  editClassDetails(classDetails: ClassSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.put(environment.baseUrl + 'api/admin/classes', classDetails, httpOptions);
  }


  deleteClassDetails(classDetails: ClassSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.delete(environment.baseUrl + 'api/admin/classes/' + classDetails.id, httpOptions);
  }


  setupSubjectDetails(subjectDetails: SubjectSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/subjects', subjectDetails, httpOptions);
  }



  editSubjectDetails(subjectDetail: SubjectSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.put(environment.baseUrl + 'api/admin/subjects', subjectDetail, httpOptions);
  }


  deleteSubjectDetails(subjectDetail: SubjectSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.delete(environment.baseUrl + 'api/admin/subjects/'+subjectDetail.classId +"/"+subjectDetail.id, httpOptions);
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
