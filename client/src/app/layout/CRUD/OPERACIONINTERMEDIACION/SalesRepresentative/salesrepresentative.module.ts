import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesRepresentativeRoutingModule } from './salesrepresentative-routing.module';
import { SalesRepresentativeComponent } from './salesrepresentative.component';
import { SalesRepresentativeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/salesrepresentative.service';
import { environment } from 'src/environments/environment';
import { RegisterService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/register.service';

@NgModule({
   imports: [CommonModule,
             SalesRepresentativeRoutingModule,
             FormsModule],
   declarations: [SalesRepresentativeComponent],
   providers: [
               NgbModal,
               RegisterService,
               SalesRepresentativeService
               ]
})
export class SalesRepresentativeModule {}