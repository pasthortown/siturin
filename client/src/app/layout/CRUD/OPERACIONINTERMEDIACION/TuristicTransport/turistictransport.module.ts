import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TuristicTransportRoutingModule } from './turistictransport-routing.module';
import { TuristicTransportComponent } from './turistictransport.component';
import { TuristicTransportService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/turistictransport.service';
import { environment } from 'src/environments/environment';
import { RegisterService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/register.service';

@NgModule({
   imports: [CommonModule,
             TuristicTransportRoutingModule,
             FormsModule],
   declarations: [TuristicTransportComponent],
   providers: [
               NgbModal,
               RegisterService,
               TuristicTransportService
               ]
})
export class TuristicTransportModule {}