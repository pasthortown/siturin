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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

import { RucDataComponent } from './ruc-data/ruc-data.component';
import { EstablishmentListDataComponent } from './establishment-list-data/establishment-list-data.component';
import { EstablishmentDataComponent } from './establishment-data/establishment-data.component';
import { PayListDataComponent } from './pay-list-data/pay-list-data.component';
import { DeclarationDataComponent } from './declaration-data/declaration-data.component';
import { TuristicDataComponent } from './turistic-data/turistic-data.component';
import { CapcidadesABDataComponent } from './turistic-data/ALIMENTOSBEBIDAS/capcidades-ab-data/capcidades-ab-data.component';
import { PrestacionesABDataComponent } from './turistic-data/ALIMENTOSBEBIDAS/prestaciones-ab-data/prestaciones-ab-data.component';
import { RegisterGeneralDataComponent } from './turistic-data/GLOBAL/register-general-data/register-general-data.component';
import { RequisitesDataComponent } from './turistic-data/GLOBAL/requisites-data/requisites-data.component';
import { AdventureDataComponent } from './turistic-data/GLOBAL/adventure-data/adventure-data.component';
import { SalesRepresentativeDataComponent } from './turistic-data/OPERACIONINTERMEDIACION/sales-representative-data/sales-representative-data.component';
import { TourGuideDataComponent } from './turistic-data/OPERACIONINTERMEDIACION/tour-guide-data/tour-guide-data.component';
import { TuristicTransportDataComponent } from './turistic-data/OPERACIONINTERMEDIACION/turistic-transport-data/turistic-transport-data.component';
import { CapacidadesALDataComponent } from './turistic-data/ALOJAMIENTO/capacidades-al-data/capacidades-al-data.component';
import { ComplementaryServicesALDataComponent } from './turistic-data/ALOJAMIENTO/complementary-services-al-data/complementary-services-al-data.component';

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
import { RequisiteService as RequisiteOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/requisite.service';
import { RequisiteService as RequisiteALService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/requisite.service';
import { RequisiteService as RequisiteABService } from 'src/app/services/CRUD/ALOJAMIENTO/requisite.service';
import { LanguageService } from 'src/app/services/CRUD/BASE/language.service';
import { RegisterService as RegisterALService } from 'src/app/services/CRUD/ALOJAMIENTO/register.service';
import { RegisterService as RegisterABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/register.service';
import { RegisterService as RegisterOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { KitchenTypeService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/kitchentype.service';
import { ServiceTypeService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/servicetype.service';
import { ComplementaryServiceFoodTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/complementaryservicefoodtype.service';
import { SIITService } from 'src/app/services/negocio/siit.service';
import { FoodDrinkAttachmentService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/fooddrinkattachment.service';
import { CapacityTypeService as CapacityTypeALService } from 'src/app/services/CRUD/ALOJAMIENTO/capacitytype.service';
import { TariffTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/tarifftype.service';
import { CapacityTypeService as CapacityTypeABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/capacitytype.service';
import { ExporterService } from 'src/app/services/negocio/exporter.service';
import { MailerService } from 'src/app/services/negocio/mailer.service';
import { RegisterProcedureService as RegisterProcedureABService} from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerprocedure.service';

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
  ],
  declarations: [
    RucDataComponent,
    EstablishmentListDataComponent,
    EstablishmentDataComponent, 
    PayListDataComponent,
    DeclarationDataComponent,
    TuristicDataComponent,
    RegisterGeneralDataComponent,
    AdventureDataComponent,
    RequisitesDataComponent,
    PrestacionesABDataComponent,
    CapcidadesABDataComponent,
    ComplementaryServicesALDataComponent,
    CapacidadesALDataComponent,
    TuristicTransportDataComponent,
    TourGuideDataComponent,
    SalesRepresentativeDataComponent
  ],
  providers: [
    NgbModal,
    UserService,
    AgreementService,
    AuthorizationAttachmentService,
    PropertyTitleAttachmentService,
    TariffTypeService,
    ExporterService,
    MailerService,
    FloorAuthorizationCertificateService,
    ConsultorService,
    ComplementaryServiceFoodTypeService,
    ComplementaryServiceTypeService,
    DinardapService,
    CatastroRegisterService,
    GroupTypeService,
    LanguageService,
    CapacityTypeALService,
    CapacityTypeABService,
    KitchenTypeService,
    ServiceTypeService,
    PersonRepresentativeAttachmentService,
    RucService,
    DeclarationService,
    DeclarationAttachmentService,
    DeclarationItemCategoryService,
    DeclarationItemService,
    PayService,
    EstablishmentService,
    GenderService,
    FoodDrinkAttachmentService,
    WorkerGroupService,
    RegisterProcedureABService,
    RegisterProcedureALService,
    RegisterProcedureOPService,
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
    UbicationService,
    SIITService
  ],
  exports: [
    RucDataComponent,
    EstablishmentListDataComponent,
    EstablishmentDataComponent, 
    PayListDataComponent,
    DeclarationDataComponent,
    TuristicDataComponent,
    RegisterGeneralDataComponent,
    AdventureDataComponent,
    RequisitesDataComponent,
    PrestacionesABDataComponent,
    CapcidadesABDataComponent,
    ComplementaryServicesALDataComponent,
    CapacidadesALDataComponent,
    TuristicTransportDataComponent,
    TourGuideDataComponent,
    SalesRepresentativeDataComponent
  ]
})
export class ClientDataModule {}
