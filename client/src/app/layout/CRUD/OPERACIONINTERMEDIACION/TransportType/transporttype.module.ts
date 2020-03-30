import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransportTypeRoutingModule } from './transporttype-routing.module';
import { TransportTypeComponent } from './transporttype.component';
import { TransportTypeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/transporttype.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             TransportTypeRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [TransportTypeComponent],
   providers: [
               NgbModal,
               TransportTypeService
               ]
})
export class TransportTypeModule {}