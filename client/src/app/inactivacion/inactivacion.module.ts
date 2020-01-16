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
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { AgmCoreModule } from '@agm/core';
import { CKEditorModule } from 'ngx-ckeditor';
import { environment } from 'src/environments/environment';
import { ProcedureJustificationService } from 'src/app/services/CRUD/ALOJAMIENTO/procedurejustification.service';

@NgModule({
    imports: [CommonModule, 
        InactivacionRoutingModule, 
        FormsModule, 
        NgbModule,
        Ng2TableModule,
        CKEditorModule,
        AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
        HttpModule],
    declarations: [InactivacionComponent],
    providers: [ConsultorService, 
        NgbModal, 
        StateService, 
        UbicationService,
        CatastroRegisterService,
        RegisterTypeService,
        ProcedureJustificationService,
        DinardapService]
})
export class InactivacionModule {}
