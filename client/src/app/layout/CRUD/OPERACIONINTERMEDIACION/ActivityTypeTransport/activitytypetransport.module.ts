import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityTypeTransportRoutingModule } from './activitytypetransport-routing.module';
import { ActivityTypeTransportComponent } from './activitytypetransport.component';
import { ActivityTypeTransportService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/activitytypetransport.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             ActivityTypeTransportRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [ActivityTypeTransportComponent],
   providers: [
               NgbModal,
               ActivityTypeTransportService
               ]
})
export class ActivityTypeTransportModule {}