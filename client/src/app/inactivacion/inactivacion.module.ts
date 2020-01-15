import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InactivacionRoutingModule } from './inactivacion-routing.module';
import { InactivacionComponent } from './inactivacion.component';
import { ConsultorService } from './../services/negocio/consultor.service';
import { DinardapService } from '../services/negocio/dinardap.service';

@NgModule({
    imports: [CommonModule, InactivacionRoutingModule, FormsModule, HttpModule],
    declarations: [InactivacionComponent],
    providers: [ConsultorService, NgbModal, DinardapService]
})
export class InactivacionModule {}
