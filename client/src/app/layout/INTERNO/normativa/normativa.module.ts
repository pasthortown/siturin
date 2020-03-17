import { RegisterTypeService } from './../../../services/CRUD/ALOJAMIENTO/registertype.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NormativaService } from './../../../services/negocio/normativa.service';
import { NormativaRoutingModule } from './normativa-routing.module';
import { NormativaComponent } from './normativa.component';
import { RequisiteService } from './../../../services/CRUD/ALOJAMIENTO/requisite.service';
@NgModule({
  imports: [CommonModule, NormativaRoutingModule,
  FormsModule, HttpModule],
  declarations: [NormativaComponent],
  providers: [NormativaService, RegisterTypeService, RequisiteService]
})
export class NormativaModule {}