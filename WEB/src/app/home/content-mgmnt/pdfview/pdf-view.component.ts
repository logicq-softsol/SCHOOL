import { Component, OnInit, EventEmitter, Inject, ViewChild, ElementRef } from '@angular/core';
import { ContentMgmntService } from '../../service/content-mgmnt.service';
import { PdfDetail } from '../questions/pdf-detail';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PDFViewComponent implements OnInit {

  pdfDetail: PdfDetail;
  pdfsrc: string;
  displayPDF: boolean = false;

  constructor(private contentMgmntService: ContentMgmntService, private router: Router) { }

  ngOnInit() {
    this.contentMgmntService.getPdfData().subscribe(result => {
      this.pdfDetail = result;
    });

  }


  gotToHomepage() {


  }
  viewDocument() {
    this.displayPDF = true;
    this.pdfsrc = environment.localurl + this.pdfDetail.link;
    this.pdfDetail.visitCount = this.pdfDetail.visitCount + 1;
    this.contentMgmntService.changePdfData(this.pdfDetail);
  }

  goToPrevious() {
    this.router.navigate(['/home/teacher/question']);
  }

}






