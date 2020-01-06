import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InactivationRequestComponent } from './inactivationrequest.component';

describe('InactivationRequestComponent', () => {
   let component: InactivationRequestComponent;
   let fixture: ComponentFixture<InactivationRequestComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [InactivationRequestComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(InactivationRequestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});