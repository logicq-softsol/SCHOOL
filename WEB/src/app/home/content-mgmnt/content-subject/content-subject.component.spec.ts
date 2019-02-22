import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSubjectComponent } from './content-subject.component';

describe('ContentSubjectComponent', () => {
  let component: ContentSubjectComponent;
  let fixture: ComponentFixture<ContentSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
