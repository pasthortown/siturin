import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportTypeComponent } from './transporttype.component';

describe('TransportTypeComponent', () => {
   let component: TransportTypeComponent;
   let fixture: ComponentFixture<TransportTypeComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [TransportTypeComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TransportTypeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});