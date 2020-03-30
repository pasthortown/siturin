import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityTransportTypeComponent } from './activitytransporttype.component';

describe('ActivityTransportTypeComponent', () => {
   let component: ActivityTransportTypeComponent;
   let fixture: ComponentFixture<ActivityTransportTypeComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ActivityTransportTypeComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ActivityTransportTypeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});