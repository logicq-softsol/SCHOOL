import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFViewComponent } from './pdf-view.component';

describe('PDFViewComponent', () => {
  let component: PDFViewComponent;
  let fixture: ComponentFixture<PDFViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PDFViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDFViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
