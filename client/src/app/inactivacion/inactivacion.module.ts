import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StateService } from 'src/app/services/CRUD/ALOJAMIENTO/state.service';

import { InactivacionRoutingModule } from './inactivacion-routing.module';
import { InactivacionComponent } from './inactivacion.component';
import { ConsultorService } from './../services/negocio/consultor.service';
import { DinardapService } from '../services/negocio/dinardap.service';
import { RegisterService as CatastroRegisterService } from 'src/app/services/CRUD/CATASTRO/register.service';
import { RegisterTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/registertype.service';

@NgModule({
    imports: [CommonModule, 
        InactivacionRoutingModule, 
        FormsModule, 
        NgbModule,
        Ng2TableModule,
        HttpModule],
    declarations: [InactivacionComponent],
    providers: [ConsultorService, 
        NgbModal, 
        StateService, 
        CatastroRegisterService,
        RegisterTypeService,
        DinardapService]
})
export class InactivacionModule {}
