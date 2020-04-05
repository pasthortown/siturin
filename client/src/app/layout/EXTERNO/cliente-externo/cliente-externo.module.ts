import { RegistersDataComponent } from './../../client-data-components/registers-data/registers-data.component';
import { OptionsDataComponent } from './../../client-data-components/options-data/options-data.component';
import { AgreementDataComponent } from './../../client-data-components/agreement-data/agreement-data.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AgmCoreModule } from '@agm/core';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { EstablishmentListDataComponent } from './../../client-data-components/establishment-list-data/establishment-list-data.component';
import { DeclarationDataComponent } from './../../client-data-components/declaration-data/declaration-data.component';
import { TuristicDataComponent } from './../../client-data-components/turistic-data/turistic-data.component';
import { RucDataComponent } from './../../client-data-components/ruc-data/ruc-data.component';
import { EstablishmentDataComponent } from './../../client-data-components/establishment-data/establishment-data.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClienteExternoRoutingModule } from './cliente-externo-routing.module';
import { ClienteExternoComponent } from './cliente-externo.component';
import { environment } from 'src/environments/environment';

import { UserService } from './../../../services/profile/user.service';
import { AgreementService } from './../../../services/CRUD/BASE/agreement.service';
import { RegisterService as CatastroRegisterService } from 'src/app/services/CRUD/CATASTRO/register.service';
import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { GroupTypeService } from 'src/app/services/CRUD/BASE/grouptype.service';
import { PersonRepresentativeAttachmentService } from './../../../services/CRUD/BASE/personrepresentativeattachment.service';
import { RucService } from './../../../services/CRUD/BASE/ruc.service';
import { EstablishmentService } from './../../../services/CRUD/BASE/establishment.service';
import { RegisterTypeService as RegisterTypeAlojamientoService } from './../../../services/CRUD/ALOJAMIENTO/registertype.service';
import { RegisterTypeService as RegisterTypeAlimentosBebidas } from './../../../services/CRUD/ALIMENTOSBEBIDAS/registertype.service';
import { RegisterTypeService as RegisterTypeOperacionIntermedacion } from './../../../services/CRUD/OPERACIONINTERMEDIACION/registertype.service';
import { RucNameTypeService } from 'src/app/services/CRUD/BASE/rucnametype.service';
import { EstablishmentPropertyTypeService } from 'src/app/services/CRUD/BASE/establishmentpropertytype.service';

@NgModule({
  imports: [
    CommonModule, 
    ClienteExternoRoutingModule,
    FormsModule,
    NgbModule,
    NgxBarcodeModule,
    CKEditorModule,
    AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
    NgxQRCodeModule,
    Ng2TableModule,
    ScrollToModule.forRoot()
  ],
  declarations: [ClienteExternoComponent, 
    AgreementDataComponent,
    OptionsDataComponent,
    RegistersDataComponent,
    EstablishmentDataComponent, 
    RucDataComponent,
    TuristicDataComponent,
    DeclarationDataComponent,
    EstablishmentListDataComponent
  ],
  providers: [UserService,
    AgreementService,
    DinardapService,
    CatastroRegisterService,
    GroupTypeService,
    PersonRepresentativeAttachmentService,
    RucService,
    EstablishmentService,
    RegisterTypeAlojamientoService,
    RegisterTypeAlimentosBebidas,
    RegisterTypeOperacionIntermedacion,
    RucNameTypeService,
    EstablishmentPropertyTypeService
  ]
})
export class ClienteExternoModule {}
