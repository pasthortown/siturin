import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApprovalStateRoutingModule } from './approvalstate-routing.module';
import { ApprovalStateComponent } from './approvalstate.component';
import { ApprovalStateService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/approvalstate.service';
import { environment } from 'src/environments/environment';
import { RegisterService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { ApprovalService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/approval.service';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             ApprovalStateRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [ApprovalStateComponent],
   providers: [
               NgbModal,
               RegisterService,
               ApprovalService,
               ApprovalStateService
               ]
})
export class ApprovalStateModule {}