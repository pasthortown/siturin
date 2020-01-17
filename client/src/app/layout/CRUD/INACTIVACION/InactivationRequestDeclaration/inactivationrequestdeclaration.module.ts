import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InactivationRequestDeclarationRoutingModule } from './inactivationrequestdeclaration-routing.module';
import { InactivationRequestDeclarationComponent } from './inactivationrequestdeclaration.component';
import { InactivationRequestDeclarationService } from './../../../../services/CRUD/INACTIVACION/inactivationrequestdeclaration.service';
import { environment } from 'src/environments/environment';
import { InactivationRequestService } from './../../../../services/CRUD/INACTIVACION/inactivationrequest.service';

@NgModule({
   imports: [CommonModule,
             InactivationRequestDeclarationRoutingModule,
             FormsModule],
   declarations: [InactivationRequestDeclarationComponent],
   providers: [
               NgbModal,
               InactivationRequestService,
               InactivationRequestDeclarationService
               ]
})
export class InactivationRequestDeclarationModule {}