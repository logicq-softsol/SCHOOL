import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { TypeDetails } from '../model/type-details';

@Component({
  selector: 'app-content-mgmnt',
  templateUrl: './content-mgmnt.component.html',
  styleUrls: ['./content-mgmnt.component.scss']
})
export class ContentMgmntComponent implements OnInit {
  
  classList:TypeDetails[]=[];
  subjectList:TypeDetails[]=[];  

  constructor(private homeService:HomeService) { }

  ngOnInit() {
   
     this.homeService.getClassDetails().subscribe((data:TypeDetails[])=>{
       this.classList=data;
     });
  }


  showSubjectList(typeDet:TypeDetails){
   this.subjectList=typeDet.list;
  }

  editSubject(subj){}

  deleteSubject(subj){}

  markFavoriteSubject(subj){}

  getWorkSpaceDetails(subj){

  }

}
