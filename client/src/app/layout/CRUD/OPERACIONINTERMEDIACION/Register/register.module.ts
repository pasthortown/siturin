import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { environment } from 'src/environments/environment';
import { ComplementaryServiceTypeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/complementaryservicetype.service';
import { RegisterTypeService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/registertype.service';

@NgModule({
   imports: [CommonModule,
             RegisterRoutingModule,
             FormsModule],
   declarations: [RegisterComponent],
   providers: [
               NgbModal,
               ComplementaryServiceTypeService,
               RegisterTypeService,
               RegisterService
               ]
})
export class RegisterModule {}