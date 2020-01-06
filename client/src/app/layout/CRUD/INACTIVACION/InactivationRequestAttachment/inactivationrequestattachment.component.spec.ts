import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InactivationRequestAttachmentComponent } from './inactivationrequestattachment.component';

describe('InactivationRequestAttachmentComponent', () => {
   let component: InactivationRequestAttachmentComponent;
   let fixture: ComponentFixture<InactivationRequestAttachmentComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [InactivationRequestAttachmentComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(InactivationRequestAttachmentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});