import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InactivationRequestAttachmentRoutingModule } from './inactivationrequestattachment-routing.module';
import { InactivationRequestAttachmentComponent } from './inactivationrequestattachment.component';
import { InactivationRequestAttachmentService } from './../../../../services/CRUD/INACTIVACION/inactivationrequestattachment.service';
import { environment } from 'src/environments/environment';
import { InactivationRequestService } from './../../../../services/CRUD/INACTIVACION/inactivationrequest.service';

@NgModule({
   imports: [CommonModule,
             InactivationRequestAttachmentRoutingModule,
             FormsModule],
   declarations: [InactivationRequestAttachmentComponent],
   providers: [
               NgbModal,
               InactivationRequestService,
               InactivationRequestAttachmentService
               ]
})
export class InactivationRequestAttachmentModule {}