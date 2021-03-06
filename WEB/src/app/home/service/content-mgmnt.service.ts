import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs";
import { environment } from "../../../environments/environment";
import { ClassSetupDetail } from '../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../public/model/subject-setup-detail';
import { ChapterSetupDetail } from '../../public/model/chapter-setup-detail';
import { ReplaySubject } from 'rxjs';
import { TopicDetail } from 'src/app/public/model/topic-detail';
import { Type } from '@angular/compiler';
import { QuestionDetails } from 'src/app/public/model/question-detail';

@Injectable({
  providedIn: 'root'
})
export class ContentMgmntService {

  public classSetupDetail = new ReplaySubject<ClassSetupDetail>(1);
  public subjectDetail = new ReplaySubject<SubjectSetupDetail>(1);
  public ChapterSetupDetail = new ReplaySubject<ChapterSetupDetail>(1);

  public classList = new ReplaySubject<ClassSetupDetail[]>(1);
  public subjectList = new ReplaySubject<SubjectSetupDetail[]>(1);
  public ChapterList = new ReplaySubject<ChapterSetupDetail[]>(1);

  public displayView = new ReplaySubject<any>(1);
  public contentDisplayView = new ReplaySubject<any>(1);
  public topic = new ReplaySubject<TopicDetail>(1);
  public questionView = new ReplaySubject<string>(1);
  public topicdisplayView = new ReplaySubject<any>(1);

  public schoolType = new ReplaySubject<string>(1);

  constructor(private http: HttpClient) { }


  public changeTopicdisplayView(topicdisplayView: string) {
    this.topicdisplayView.next(topicdisplayView);
  }



  getTopicdisplayView() {
    return this.topicdisplayView.asObservable();
  }



  public changeSchoolType(schoolType: string) {
    this.schoolType.next(schoolType);
  }



  getSchoolType() {
    return this.schoolType.asObservable();
  }




  getQuestionView() {
    return this.questionView.asObservable();
  }

  public changeQuestionView(questionView: string) {
    this.questionView.next(questionView);
  }


  getTopic() {
    return this.topic.asObservable();
  }

  public changeTopic(topic: any) {
    this.topic.next(topic);
  }


  getContentDisplayView() {
    return this.contentDisplayView.asObservable();
  }

  public changeContentDisplayView(display: any) {
    this.contentDisplayView.next(display);
  }


  getDisplayView() {
    return this.displayView.asObservable();
  }

  public changeDisplayView(display: any) {
    this.displayView.next(display);
  }



  getClassList() {
    return this.classList.asObservable();
  }

  public changeClassList(classlist: ClassSetupDetail[]) {
    this.classList.next(classlist);
  }



  getSubjectList() {
    return this.subjectList.asObservable();
  }

  public changeSubjectList(subjectlist: SubjectSetupDetail[]) {
    this.subjectList.next(subjectlist);
  }



  getChapterList() {
    return this.ChapterList.asObservable();
  }

  public changeChapterList(chapterlist: ChapterSetupDetail[]) {
    this.ChapterList.next(chapterlist);
  }



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


  getSubjectListForClass(classId: string) {
    return this.http.get(environment.baseUrl + 'api/admin/subjects/' + classId);
  }


  getChapterListForSubjectAndClass(classId: string, subjectId: string) {
    return this.http.get(environment.baseUrl + 'api/admin/chapters/' + classId + "/" + subjectId);
  }

  getTopicListForChapterForSubjectAndClass(classId: string, subjectId: string, chapterId: string) {
    return this.http.get(environment.baseUrl + 'api/admin/topic/' + classId + "/" + subjectId + "/" + chapterId);
  }


  getTopicListForChapterForSubjectAndClassWithContentType(classId: string, subjectId: string, chapterId: string, contentType: string) {
    return this.http.get(environment.baseUrl + 'api/admin/topics/' + classId + "/" + subjectId + "/" + chapterId + "/" + contentType);
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
    return this.http.get(environment.baseUrl + 'api/admin/favorties');
  }

  markFavorites(favorite: any) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/favortie', favorite, httpOptions);
  }


  removeFavorites(id: number) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.delete(environment.baseUrl + 'api/admin/favortie/' + id, httpOptions);
  }

  loadVideoFile() {
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.baseUrl + 'api/admin/readvideofile', httpOptions);
  }

  playLesson(topic: TopicDetail) {
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.baseUrl + 'api/admin/playlesson/' + topic.id, httpOptions);

  }


  readQuestionForChpaterTopic(question: QuestionDetails) {
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.baseUrl + 'api/admin/readQuestion/' + question.id, httpOptions);

  }

  setupMCQQuestionForSchool() {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/day0/questionsetup', httpOptions);

  }

  setupDayZeroForSchool() {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/admin/day0/setup', httpOptions);
  }

  getAllTopics() {
    return this.http.get(environment.baseUrl + 'api/admin/topics');
  }


  getClassDetails(classId: any) {
    return this.http.get(environment.baseUrl + 'api/admin/classes/' + classId);
  }


  getSubjectAndClass(classId: string, subjectId: string) {
    return this.http.get(environment.baseUrl + 'api/admin/subjects/' + classId + "/" + subjectId);
  }


  getChapterForClassAndSubject(classId: string, subjectId: string, chapter: string) {
    return this.http.get(environment.baseUrl + 'api/admin/chapters/' + classId + "/" + subjectId + "/" + chapter);
  }



  getRemaingLicenseDays() {
    return this.http.get(environment.baseUrl + 'api/checkProductActivationDate');
  }
  startSession(topic: TopicDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + `api/session/${topic.classId}/${topic.subjectId}/${topic.chapterId}/${topic.id}`, httpOptions);
  }
  endSession(topic: TopicDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.put(environment.baseUrl + `api/session/${topic.classId}/${topic.subjectId}/${topic.chapterId}/${topic.id}`, httpOptions);
  }
  getUserSession(interval) {
    return this.http.get(environment.baseUrl + 'api/session/' + interval);
  }
  getAllSessions(interval) {
    return this.http.get(environment.baseUrl + 'api/sessions/' + interval);
  }


  getQuestionForChapterAccordigToType(chapter: ChapterSetupDetail, type: string, pageNo: any, pageSize: any) {
    let params = new HttpParams()
      .set('pageNo', pageNo)
      .set('pageSize', pageSize);

    return this.http.get(environment.baseUrl + 'api/admin/questions/' + chapter.classId + "/" + chapter.subjectId + "/" + chapter.id + "/" + type, { params });
  }


  getQuestionCountForChapterAccordigToType(chapter: ChapterSetupDetail, type: string) {
    return this.http.get(environment.baseUrl + 'api/admin/questions/count/' + chapter.classId + "/" + chapter.subjectId + "/" + chapter.id + "/" + type);
  }
}
