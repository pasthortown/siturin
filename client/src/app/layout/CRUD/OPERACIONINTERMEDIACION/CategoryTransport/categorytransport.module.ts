import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryTransportRoutingModule } from './categorytransport-routing.module';
import { CategoryTransportComponent } from './categorytransport.component';
import { CategoryTransportService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/categorytransport.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             CategoryTransportRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [CategoryTransportComponent],
   providers: [
               NgbModal,
               CategoryTransportService
               ]
})
export class CategoryTransportModule {}