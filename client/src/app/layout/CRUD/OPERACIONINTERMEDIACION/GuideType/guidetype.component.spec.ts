import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GuideTypeComponent } from './guidetype.component';

describe('GuideTypeComponent', () => {
   let component: GuideTypeComponent;
   let fixture: ComponentFixture<GuideTypeComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [GuideTypeComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(GuideTypeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});