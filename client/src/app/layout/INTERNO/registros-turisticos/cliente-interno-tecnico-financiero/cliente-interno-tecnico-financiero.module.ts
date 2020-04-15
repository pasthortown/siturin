import { TecnicoFinancieroGestionDataComponent } from './../components/tecnico-financiero/tecnico-financiero-gestion-data/tecnico-financiero-gestion-data.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AgmCoreModule } from '@agm/core';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ClienteInternoTecnicoFinancieroRoutingModule } from './cliente-interno-tecnico-financiero-routing.module';
import { RegisterDataModule } from './../components/register-data/register-data.module';

import { TecnicoFinancieroBandejasDataComponent } from './../components/tecnico-financiero/tecnico-financiero-bandejas-data/tecnico-financiero-bandejas-data.component';
import { ClienteInternoTecnicoFinancieroComponent } from './cliente-interno-tecnico-financiero.component';

import { UserService } from 'src/app/services/profile/user.service';
import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { StateService as StateALService} from 'src/app/services/CRUD/ALOJAMIENTO/state.service';
import { StateService as StateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/state.service';
import { StateService as StateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/state.service';
import { PayTaxService } from 'src/app/services/CRUD/FINANCIERO/paytax.service';

@NgModule({
  imports: [CommonModule, 
    FormsModule,
    NgbModule,
    NgxBarcodeModule,
    CKEditorModule,
    AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
    NgxQRCodeModule,
    Ng2TableModule,
    ScrollToModule.forRoot(),
    ClienteInternoTecnicoFinancieroRoutingModule,
    RegisterDataModule
  ],
  declarations: [ClienteInternoTecnicoFinancieroComponent, TecnicoFinancieroGestionDataComponent, TecnicoFinancieroBandejasDataComponent],
  providers: [
    UserService,
    ConsultorService,
    StateALService,
    StateABService,
    StateOPService,
    PayTaxService
  ]
})
export class ClienteInternoTecnicoFinancieroModule {}
