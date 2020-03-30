import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityTransportTypeRoutingModule } from './activitytransporttype-routing.module';
import { ActivityTransportTypeComponent } from './activitytransporttype.component';
import { ActivityTransportTypeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/activitytransporttype.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             ActivityTransportTypeRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [ActivityTransportTypeComponent],
   providers: [
               NgbModal,
               ActivityTransportTypeService
               ]
})
export class ActivityTransportTypeModule {}