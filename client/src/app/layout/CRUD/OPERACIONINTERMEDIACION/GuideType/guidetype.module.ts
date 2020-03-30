import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GuideTypeRoutingModule } from './guidetype-routing.module';
import { GuideTypeComponent } from './guidetype.component';
import { GuideTypeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/guidetype.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             GuideTypeRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [GuideTypeComponent],
   providers: [
               NgbModal,
               GuideTypeService
               ]
})
export class GuideTypeModule {}