import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { TypeDetails } from '../model/type-details';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDetail } from 'src/app/public/model/user-detail';

@Component({
  selector: 'app-content-mgmnt',
  templateUrl: './content-mgmnt.component.html',
  styleUrls: ['./content-mgmnt.component.scss']
})
export class ContentMgmntComponent implements OnInit {

  classList: TypeDetails[] = [];
  subjectList: TypeDetails[] = [];
  user: UserDetail=new UserDetail();
  constructor(private homeService: HomeService, private authService: AuthenticationService) { }

  ngOnInit() {

    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;
    });

    this.homeService.getClassDetails().subscribe((data: TypeDetails[]) => {
      this.classList = data;
    });
  }


  showSubjectList(typeDet: TypeDetails) {
    this.subjectList = typeDet.list;
  }

  showSubjectDetails(subj:any,classdetails:any) {

  }

  editSubject(subj) { }

  deleteSubject(subj) { }

  markFavoriteSubject(subj) { }

  getWorkSpaceDetails(subj) {

  }

}
