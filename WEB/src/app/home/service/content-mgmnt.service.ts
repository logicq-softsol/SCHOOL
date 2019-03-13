import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs";
import { environment } from "../../../environments/environment";
import { ClassSetupDetail } from '../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../public/model/subject-setup-detail';
import { ChapterSetupDetail } from '../../public/model/chapter-setup-detail';
import { ReplaySubject } from 'rxjs';
import { TopicDetail } from 'src/app/public/model/topic-detail';

@Injectable({
  providedIn: 'root'
})
export class ContentMgmntService {

  public classSetupDetail = new ReplaySubject<ClassSetupDetail>(1);
  public subjectDetail = new ReplaySubject<SubjectSetupDetail>(1);
  public ChapterSetupDetail = new ReplaySubject<ChapterSetupDetail>(1);

  constructor(private http: HttpClient) { }




  getChapterSetupDetail() {
    return this.ChapterSetupDetail.asObservable();
  }

  public changeChapterSetupDetail(ChapterSetupDetail: ChapterSetupDetail) {
    this.ChapterSetupDetail.next(ChapterSetupDetail);
  }



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
    return this.http.delete(environment.baseUrl + 'api/admin/subjects/' + subjectDetail.classId + "/" + subjectDetail.id, httpOptions);
  }



  setupChapterDetails(chapterDetail: ChapterSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/chapters', chapterDetail, httpOptions);
  }



  editChapterDetails(chapterDetail: ChapterSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.put(environment.baseUrl + 'api/admin/chapters', chapterDetail, httpOptions);
  }


  deleteChapterDetails(chapterDetail: ChapterSetupDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.delete(environment.baseUrl + 'api/admin/chapters/' + chapterDetail.classId + "/" + chapterDetail.subjectId + "/" + chapterDetail.id, httpOptions);
  }



  getClassDetailList() {
    return this.http.get(environment.baseUrl + 'api/admin/classes');
  }


  getSubjectListForClass(classId: number) {
    return this.http.get(environment.baseUrl + 'api/admin/subjects/' + classId);
  }


  getChapterListForSubjectAndClass(classId: number, subjectId: number) {
    return this.http.get(environment.baseUrl + 'api/admin/chapters/' + classId + "/" + subjectId);
  }

  getTopicListForChapterForSubjectAndClass(classId: number, subjectId: number, chapterId: number) {
    return this.http.get(environment.baseUrl + 'api/admin/topic/' + classId + "/" + subjectId + "/" + chapterId);
  }


  getWorkSpaceDetailForTopic(topic: TopicDetail) {
    return this.http.get(environment.baseUrl + 'api/admin/workspace/' + topic.classId + "/" + topic.subjectId + "/" + topic.chapterId + "/" + topic.id);
  }

  getWorkSpaceDetailForChapter(chapter: ChapterSetupDetail) {
    return this.http.get(environment.baseUrl + 'api/admin/workspace/' + chapter.classId + "/" + chapter.subjectId + "/" + chapter.id);
  }




  setupTopicDetails(topicDetail: TopicDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/topic', topicDetail, httpOptions);
  }



  editTopicDetails(topicDetail: TopicDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.put(environment.baseUrl + 'api/admin/topic', topicDetail, httpOptions);
  }


  deleteTopicDetails(topicDetail: TopicDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.delete(environment.baseUrl + 'api/admin/topic/' + topicDetail.classId + "/" + topicDetail.subjectId + "/" + topicDetail.chapterId + "/" + topicDetail.id, httpOptions);
  }


  getFavorites() {
    return this.http.get(environment.baseUrl + 'api/admin/favortie/');
  }

  markFavorites(favorite: any) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/favortie', favorite, httpOptions);
  }


  removeFavorites(type: string,typeId:number) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.delete(environment.baseUrl + 'api/admin/favortie/'+type+"/"+typeId, httpOptions);
  }

loadVideoFile(){
  const httpOptions = {
    'responseType': 'arraybuffer' as 'json'
  };
  return this.http.get<any>(environment.baseUrl +'api/admin/readvideofile', httpOptions);
}

}
