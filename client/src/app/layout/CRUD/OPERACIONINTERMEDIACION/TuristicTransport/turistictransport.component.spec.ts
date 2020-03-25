import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TuristicTransportComponent } from './turistictransport.component';

describe('TuristicTransportComponent', () => {
   let component: TuristicTransportComponent;
   let fixture: ComponentFixture<TuristicTransportComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [TuristicTransportComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TuristicTransportComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});