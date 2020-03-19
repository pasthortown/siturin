import { RegisterTypeService } from './../../../services/CRUD/ALOJAMIENTO/registertype.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NormativaRoutingModule } from './normativa-routing.module';
import { NormativaComponent } from './normativa.component';
import { RequisiteService } from './../../../services/CRUD/ALOJAMIENTO/requisite.service';
import { RegisterTypeService as RegisterTypeABService } from './../../../services/CRUD/ALIMENTOSBEBIDAS/registertype.service';
@NgModule({
  imports: [CommonModule, NormativaRoutingModule,
  FormsModule, HttpModule],
  declarations: [NormativaComponent],
  providers: [RegisterTypeService, RequisiteService, RegisterTypeABService]
})
export class NormativaModule {}
