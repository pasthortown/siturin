import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InactivationRequestRoutingModule } from './inactivationrequest-routing.module';
import { InactivationRequestComponent } from './inactivationrequest.component';
import { InactivationRequestService } from './../../../../services/CRUD/INACTIVACION/inactivationrequest.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             InactivationRequestRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [InactivationRequestComponent],
   providers: [
               NgbModal,
               InactivationRequestService
               ]
})
export class InactivationRequestModule {}