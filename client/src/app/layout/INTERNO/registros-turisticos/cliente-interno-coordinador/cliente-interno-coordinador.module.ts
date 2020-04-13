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
import { RegisterDataModule } from './../components/register-data/register-data.module';

import { CoordinadorBandejasDataComponent } from './../components/coordinador/coordinador-bandejas-data/coordinador-bandejas-data.component';
import { ClienteInternoCoordinadorComponent } from './cliente-interno-coordinador.component';
import { ClienteInternoCoordinadorRoutingModule } from './cliente-interno-coordinador-routing.module';

import { UserService } from 'src/app/services/profile/user.service';
import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { StateService as StateALService} from 'src/app/services/CRUD/ALOJAMIENTO/state.service';
import { StateService as StateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/state.service';
import { StateService as StateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/state.service';

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
    ClienteInternoCoordinadorRoutingModule,
    RegisterDataModule
  ],
  declarations: [ClienteInternoCoordinadorComponent, CoordinadorBandejasDataComponent],
  providers: [
    UserService,
    ConsultorService,
    StateALService,
    StateABService,
    StateOPService
  ]
})
export class ClienteInternoCoordinadorModule {}
