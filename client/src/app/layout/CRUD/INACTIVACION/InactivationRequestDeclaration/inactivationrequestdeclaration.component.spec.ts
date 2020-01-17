import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InactivationRequestDeclarationComponent } from './inactivationrequestdeclaration.component';

describe('InactivationRequestDeclarationComponent', () => {
   let component: InactivationRequestDeclarationComponent;
   let fixture: ComponentFixture<InactivationRequestDeclarationComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [InactivationRequestDeclarationComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(InactivationRequestDeclarationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});