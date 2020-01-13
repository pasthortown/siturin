import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CapacityPictureRoutingModule } from './capacitypicture-routing.module';
import { CapacityPictureComponent } from './capacitypicture.component';
import { CapacityPictureService } from './../../../../services/CRUD/ALIMENTOSBEBIDAS/capacitypicture.service';
import { environment } from 'src/environments/environment';
import { CapacityTypeService } from './../../../../services/CRUD/ALIMENTOSBEBIDAS/capacitytype.service';

@NgModule({
   imports: [CommonModule,
             CapacityPictureRoutingModule,
             FormsModule],
   declarations: [CapacityPictureComponent],
   providers: [
               NgbModal,
               CapacityTypeService,
               CapacityPictureService
               ]
})
export class CapacityPictureModule {}