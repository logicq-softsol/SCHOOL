import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import "rxjs";
import { environment } from "../../../environments/environment";
import { SubjectSetupDetail } from 'src/app/public/model/subject-setup-detail';
import { ClassSetupDetail } from 'src/app/public/model/class-setup-detail';
import { ChapterSetupDetail } from 'src/app/public/model/chapter-setup-detail';
import { TopicDetail } from 'src/app/public/model/topic-detail';
import { LoginDetail } from 'src/app/public/model/login-detail';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }




  uploadImagesForEntity(imageData: File, entityId: any, entityType: string) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", undefined);
    headers.append("Access-Control-Allow-Origin", "*");
    let httpOptions = { headers: headers };
    const file: FormData = new FormData();
    file.append("file", imageData, imageData.name);
    file.append("entityId", entityId.toString());
    file.append("entityType", entityType);
    file.append("classId", null);
    file.append("subjectId", null);
    file.append("chapterId", null);
    return this.http.post(environment.baseUrl + "api/uploadFile", file, httpOptions);
  }



  uploadImagesForSubject(imageData: File, subjectDet: SubjectSetupDetail) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", undefined);
    headers.append("Access-Control-Allow-Origin", "*");
    let httpOptions = { headers: headers };
    const file: FormData = new FormData();
    file.append("file", imageData, imageData.name);
    file.append("entityId", subjectDet.id.toString());
    file.append("entityType", "SUBJECT");
    file.append("classId", subjectDet.classId.toString());
    file.append("subjectId", null);
    file.append("chapterId", null);
    return this.http.post(environment.baseUrl + "api/uploadFile", file, httpOptions);
  }



  uploadImagesForChapter(imageData: File, chapterDetail: ChapterSetupDetail) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", undefined);
    headers.append("Access-Control-Allow-Origin", "*");
    let httpOptions = { headers: headers };
    const file: FormData = new FormData();
    file.append("file", imageData, imageData.name);
    file.append("entityId", chapterDetail.id.toString());
    file.append("entityType", "CHAPTER");
    file.append("classId", chapterDetail.classId.toString());
    file.append("subjectId", chapterDetail.subjectId.toString());
    file.append("chapterId", null);
    return this.http.post(environment.baseUrl + "api/uploadFile", file, httpOptions);
  }



  uploadImagesForTopic(imageData: File, topic: TopicDetail) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", undefined);
    headers.append("Access-Control-Allow-Origin", "*");
    let httpOptions = { headers: headers };
    const file: FormData = new FormData();
    file.append("file", imageData, imageData.name);
    file.append("entityId", topic.id.toString());
    file.append("entityType", "TOPIC");
    file.append("classId", topic.classId.toString());
    file.append("subjectId", topic.subjectId.toString());
    file.append("chapterId", topic.chapterId.toString());
    return this.http.post(environment.baseUrl + "api/uploadFile", file, httpOptions);
  }




  uploadImagesForProfile(imageData: File) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", undefined);
    headers.append("Access-Control-Allow-Origin", "*");
    let httpOptions = { headers: headers };
    const file: FormData = new FormData();
    file.append("file", imageData, imageData.name);
    return this.http.post(environment.baseUrl + "api/uploadProfileImage", file, httpOptions);
  }


  
  registerUser(login: LoginDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/userRegister', login, httpOptions);
  }

  
  findUsers() {
    return this.http.get(environment.baseUrl + 'api/users');
  }


}
