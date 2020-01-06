import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateRoutingModule } from './state-routing.module';
import { StateComponent } from './state.component';
import { StateService } from './../../../../services/CRUD/INACTIVACION/state.service';
import { environment } from 'src/environments/environment';
import { InactivationRequestService } from './../../../../services/CRUD/INACTIVACION/inactivationrequest.service';

@NgModule({
   imports: [CommonModule,
             StateRoutingModule,
             FormsModule],
   declarations: [StateComponent],
   providers: [
               NgbModal,
               InactivationRequestService,
               StateService
               ]
})
export class StateModule {}