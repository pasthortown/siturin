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

import { ClienteExternoRoutingModule } from './cliente-externo-routing.module';
import { ClienteExternoComponent } from './cliente-externo.component';
import { ClientDataModule } from './../../client-data-components/client-data.module';

import { AgreementDataComponent } from './../../client-data-components/agreement-data/agreement-data.component';
import { OptionsDataComponent } from './../../client-data-components/options-data/options-data.component';
import { RegistersDataComponent } from './../../client-data-components/registers-data/registers-data.component';

import { UserService } from 'src/app/services/profile/user.service';
import { RegisterService as CatastroRegisterService } from 'src/app/services/CRUD/CATASTRO/register.service';
import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { AgreementService } from 'src/app/services/CRUD/BASE/agreement.service';

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
    ClienteExternoRoutingModule,
    ClientDataModule
  ],
  declarations: [ClienteExternoComponent, 
    AgreementDataComponent,
    OptionsDataComponent,
    RegistersDataComponent,
  ],
  providers: [
    UserService,
    AgreementService,
    ConsultorService,
    CatastroRegisterService,
  ]
})
export class ClienteExternoModule {}
