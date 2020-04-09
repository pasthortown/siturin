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

import { ClienteExternoRoutingModule } from './cliente-externo-routing.module';
import { ClienteExternoComponent } from './cliente-externo.component';
import { environment } from 'src/environments/environment';

import { EstablishmentListDataComponent } from './../../client-data-components/establishment-list-data/establishment-list-data.component';
import { DeclarationDataComponent } from './../../client-data-components/declaration-data/declaration-data.component';
import { TuristicDataComponent } from './../../client-data-components/turistic-data/turistic-data.component';
import { RucDataComponent } from './../../client-data-components/ruc-data/ruc-data.component';
import { EstablishmentDataComponent } from './../../client-data-components/establishment-data/establishment-data.component';
import { RegistersDataComponent } from './../../client-data-components/registers-data/registers-data.component';
import { OptionsDataComponent } from './../../client-data-components/options-data/options-data.component';
import { AgreementDataComponent } from './../../client-data-components/agreement-data/agreement-data.component';
import { PayListDataComponent } from './../../client-data-components/pay-list-data/pay-list-data.component';
import { CapcidadesABDataComponent } from './../../client-data-components/turistic-data/ALIMENTOSBEBIDAS/capcidades-ab-data/capcidades-ab-data.component';
import { PrestacionesABDataComponent } from './../../client-data-components/turistic-data/ALIMENTOSBEBIDAS/prestaciones-ab-data/prestaciones-ab-data.component';

import { UserService } from 'src/app/services/profile/user.service';
import { AgreementService } from 'src/app/services/CRUD/BASE/agreement.service';
import { RegisterService as CatastroRegisterService } from 'src/app/services/CRUD/CATASTRO/register.service';
import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { GroupTypeService } from 'src/app/services/CRUD/BASE/grouptype.service';
import { PersonRepresentativeAttachmentService } from 'src/app/services/CRUD/BASE/personrepresentativeattachment.service';
import { RucService } from 'src/app/services/CRUD/BASE/ruc.service';
import { EstablishmentService } from 'src/app/services/CRUD/BASE/establishment.service';
import { RucNameTypeService } from 'src/app/services/CRUD/BASE/rucnametype.service';
import { EstablishmentPictureService } from 'src/app/services/CRUD/BASE/establishmentpicture.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { EstablishmentCertificationTypeService } from 'src/app/services/CRUD/BASE/establishmentcertificationtype.service';
import { GenderService } from 'src/app/services/CRUD/BASE/gender.service';
import { WorkerGroupService } from 'src/app/services/CRUD/BASE/workergroup.service';
import { EstablishmentPropertyTypeService } from 'src/app/services/CRUD/BASE/establishmentpropertytype.service';
import { DeclarationService } from 'src/app/services/CRUD/FINANCIERO/declaration.service';
import { PayService } from 'src/app/services/CRUD/FINANCIERO/pay.service';
import { DeclarationAttachmentService } from 'src/app/services/CRUD/FINANCIERO/declarationattachment.service';
import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { DeclarationItemCategoryService } from 'src/app/services/CRUD/FINANCIERO/declarationitemcategory.service';
import { DeclarationItemService } from 'src/app/services/CRUD/FINANCIERO/declarationitem.service';
import { FloorAuthorizationCertificateService } from 'src/app/services/CRUD/BASE/floorauthorizationcertificate.service';
import { PropertyTitleAttachmentService } from 'src/app/services/CRUD/ALOJAMIENTO/propertytitleattachment.service';
import { AuthorizationAttachmentService } from 'src/app/services/CRUD/ALOJAMIENTO/authorizationattachment.service';
import { ComplementaryServiceTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/complementaryservicetype.service';

import { RegisterGeneralDataComponent } from './../../client-data-components/turistic-data/GLOBAL/register-general-data/register-general-data.component';
import { RequisitesDataComponent } from './../../client-data-components/turistic-data/GLOBAL/requisites-data/requisites-data.component';
import { AdventureDataComponent } from './../../client-data-components/turistic-data/GLOBAL/adventure-data/adventure-data.component';

import { RequisiteService as RequisiteOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/requisite.service';
import { RequisiteService as RequisiteALService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/requisite.service';
import { RequisiteService as RequisiteABService } from 'src/app/services/CRUD/ALOJAMIENTO/requisite.service';

import { LanguageService } from 'src/app/services/CRUD/BASE/language.service';
import { RegisterService as RegisterALService } from 'src/app/services/CRUD/ALOJAMIENTO/register.service';
import { RegisterService as RegisterABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/register.service';
import { RegisterService as RegisterOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/register.service';

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
    ClienteExternoRoutingModule
  ],
  declarations: [ClienteExternoComponent, 
    AgreementDataComponent,
    OptionsDataComponent,
    RegistersDataComponent,
    EstablishmentDataComponent, 
    DeclarationDataComponent,
    RucDataComponent,
    TuristicDataComponent,
    PayListDataComponent,
    EstablishmentListDataComponent,
    RegisterGeneralDataComponent,
    AdventureDataComponent,
    RequisitesDataComponent,
    PrestacionesABDataComponent,
    CapcidadesABDataComponent
  ],
  providers: [
    UserService,
    AgreementService,
    AuthorizationAttachmentService,
    PropertyTitleAttachmentService,
    FloorAuthorizationCertificateService,
    ConsultorService,
    ComplementaryServiceTypeService,
    DinardapService,
    CatastroRegisterService,
    GroupTypeService,
    LanguageService,
    PersonRepresentativeAttachmentService,
    RucService,
    DeclarationService,
    DeclarationAttachmentService,
    DeclarationItemCategoryService,
    DeclarationItemService,
    PayService,
    EstablishmentService,
    GenderService,
    WorkerGroupService,
    RucNameTypeService,
    EstablishmentPictureService,
    EstablishmentCertificationTypeService,
    EstablishmentPropertyTypeService,
    RequisiteOPService,
    RequisiteALService,
    RequisiteABService,
    RegisterALService,
    RegisterABService,
    RegisterOPService,
    UbicationService
  ]
})
export class ClienteExternoModule {}
