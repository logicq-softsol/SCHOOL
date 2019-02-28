import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentTopicComponent } from '../../../../home/content-mgmnt/content-subject/content-topic/content-topic.component';


describe('ContentTopicComponent', () => {
  let component: ContentTopicComponent;
  let fixture: ComponentFixture<ContentTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
