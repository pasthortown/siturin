import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TourGuideRoutingModule } from './tourguide-routing.module';
import { TourGuideComponent } from './tourguide.component';
import { TourGuideService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/tourguide.service';
import { environment } from 'src/environments/environment';
import { RegisterService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { ClassificationGuideService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/classificationguide.service';

@NgModule({
   imports: [CommonModule,
             TourGuideRoutingModule,
             FormsModule],
   declarations: [TourGuideComponent],
   providers: [
               NgbModal,
               RegisterService,
               ClassificationGuideService,
               TourGuideService
               ]
})
export class TourGuideModule {}