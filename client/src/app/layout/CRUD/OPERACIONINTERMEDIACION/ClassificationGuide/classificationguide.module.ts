import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassificationGuideRoutingModule } from './classificationguide-routing.module';
import { ClassificationGuideComponent } from './classificationguide.component';
import { ClassificationGuideService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/classificationguide.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             ClassificationGuideRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [ClassificationGuideComponent],
   providers: [
               NgbModal,
               ClassificationGuideService
               ]
})
export class ClassificationGuideModule {}