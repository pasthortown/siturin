import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BitacoraRoutingModule } from './bitacora-routing.module';
import { BitacoraComponent } from './bitacora.component';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { StateService } from 'src/app/services/CRUD/ALOJAMIENTO/state.service';
import { RegisterTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/registertype.service';
import { UserService } from 'src/app/services/profile/user.service';
import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { RegisterTypeService as RegisterTypeABService} from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registertype.service';
import { ConsultorService } from 'src/app/services/negocio/consultor.service';

@NgModule({
  imports: [CommonModule,
    BitacoraRoutingModule,
    FormsModule, 
    NgbModule,
    Ng2TableModule,
    HttpModule],
  declarations: [BitacoraComponent],
  providers: [
    UbicationService,
    StateService,
    RegisterTypeABService,
    ConsultorService,
    UserService,
    RegisterTypeService,
    DinardapService]
})
export class BitacoraModule {}
