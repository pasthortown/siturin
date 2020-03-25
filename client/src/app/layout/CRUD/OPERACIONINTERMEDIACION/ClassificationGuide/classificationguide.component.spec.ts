import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassificationGuideComponent } from './classificationguide.component';

describe('ClassificationGuideComponent', () => {
   let component: ClassificationGuideComponent;
   let fixture: ComponentFixture<ClassificationGuideComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ClassificationGuideComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ClassificationGuideComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});