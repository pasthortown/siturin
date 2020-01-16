import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InactivationRequestRoutingModule } from './inactivationrequest-routing.module';
import { InactivationRequestComponent } from './inactivationrequest.component';
import { InactivationRequestService } from './../../../../services/CRUD/INACTIVACION/inactivationrequest.service';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             InactivationRequestRoutingModule,
             CKEditorModule,
             AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
             FormsModule],
   declarations: [InactivationRequestComponent],
   providers: [
               NgbModal,
               InactivationRequestService
               ]
})
export class InactivationRequestModule {}