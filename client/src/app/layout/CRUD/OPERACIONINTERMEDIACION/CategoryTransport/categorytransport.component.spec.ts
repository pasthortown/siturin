import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryTransportComponent } from './categorytransport.component';

describe('CategoryTransportComponent', () => {
   let component: CategoryTransportComponent;
   let fixture: ComponentFixture<CategoryTransportComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [CategoryTransportComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(CategoryTransportComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});