import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityTypeTransportComponent } from './activitytypetransport.component';

describe('ActivityTypeTransportComponent', () => {
   let component: ActivityTypeTransportComponent;
   let fixture: ComponentFixture<ActivityTypeTransportComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ActivityTypeTransportComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ActivityTypeTransportComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});