import { ZoneService } from './../../../services/CRUD/BASE/zone.service';
import { RegisterProcedureService } from './../../../services/CRUD/ALOJAMIENTO/registerprocedure.service';
import { ApprovalStateAttachmentService } from './../../../services/CRUD/ALOJAMIENTO/approvalstateattachment.service';
import { ApprovalStateService } from './../../../services/CRUD/ALOJAMIENTO/approvalstate.service';
import { RegisterService } from 'src/app/services/CRUD/ALOJAMIENTO/register.service';
import { EstablishmentPictureService } from 'src/app/services/CRUD/BASE/establishmentpicture.service';
import { AgreementService } from 'src/app/services/CRUD/BASE/agreement.service';
import { UserService } from 'src/app/services/profile/user.service';
import { TecnicoFinancieroComponent } from './tecnico-financiero.component';
import { StateService as StateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/state.service';
import { TecnicoFinancieroRoutingModule } from './tecnico-financiero-routing.module';
import { PersonRepresentativeAttachmentService } from 'src/app/services/CRUD/BASE/personrepresentativeattachment.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { MailerService } from './../../../services/negocio/mailer.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { RegisterStateService } from 'src/app/services/CRUD/ALOJAMIENTO/registerstate.service';
import { WorkerService } from 'src/app/services/CRUD/BASE/worker.service';
import { TaxPayerTypeService } from 'src/app/services/CRUD/BASE/taxpayertype.service';
import { RucService } from 'src/app/services/CRUD/BASE/ruc.service';
import { EstablishmentService } from 'src/app/services/CRUD/BASE/establishment.service';
import { EstablishmentCertificationService } from 'src/app/services/CRUD/BASE/establishmentcertification.service';
import { EstablishmentPropertyTypeService } from 'src/app/services/CRUD/BASE/establishmentpropertytype.service';
import { RequisiteService } from 'src/app/services/CRUD/ALOJAMIENTO/requisite.service';
import { LanguageService } from 'src/app/services/CRUD/BASE/language.service';
import { PreviewRegisterCodeService } from 'src/app/services/CRUD/BASE/previewregistercode.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { GroupTypeService } from 'src/app/services/CRUD/BASE/grouptype.service';
import { SystemNameService } from 'src/app/services/CRUD/BASE/systemname.service';
import { WorkerGroupService } from 'src/app/services/CRUD/BASE/workergroup.service';
import { GenderService } from 'src/app/services/CRUD/BASE/gender.service';
import { EstablishmentCertificationTypeService } from 'src/app/services/CRUD/BASE/establishmentcertificationtype.service';
import { RegisterTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/registertype.service';
import { ComplementaryServiceTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/complementaryservicetype.service';
import { BedTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/bedtype.service';
import { TariffTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/tarifftype.service';
import { RucNameTypeService } from 'src/app/services/CRUD/BASE/rucnametype.service';
import { StateService } from 'src/app/services/CRUD/FINANCIERO/state.service';
import { DeclarationAttachmentService } from 'src/app/services/CRUD/FINANCIERO/declarationattachment.service';
import { CapacityTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/capacitytype.service';
import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { EstablishmentCertificationAttachmentService } from 'src/app/services/CRUD/BASE/establishmentcertificationattachment.service';
import { ComplementaryServiceFoodTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/complementaryservicefoodtype.service';
import { DeclarationItemService } from 'src/app/services/CRUD/FINANCIERO/declarationitem.service';
import { DeclarationItemCategoryService } from 'src/app/services/CRUD/FINANCIERO/declarationitemcategory.service';
import { DeclarationService } from 'src/app/services/CRUD/FINANCIERO/declaration.service';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PayService } from './../../../services/CRUD/FINANCIERO/pay.service';
import { StateDeclarationService } from 'src/app/services/CRUD/FINANCIERO/statedeclaration.service';
import { StateService as StateAlojamientoService } from 'src/app/services/CRUD/ALOJAMIENTO/state.service';
import { PayTaxService } from 'src/app/services/CRUD/FINANCIERO/paytax.service';
import { RegisterService as RegistroCatastroService } from 'src/app/services/CRUD/CATASTRO/register.service';
import { ExporterService } from 'src/app/services/negocio/exporter.service';
import { PayAttachmentService } from 'src/app/services/CRUD/FINANCIERO/payattachment.service';
import { RegisterTypeService as RegisterTypeABService} from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registertype.service';
import { RegisterStateService as RegisterStateABService} from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerstate.service';
import { RegisterService as RegisterABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/register.service';
import { ApprovalStateService as ApprovalStateABService } from './../../../services/CRUD/ALIMENTOSBEBIDAS/approvalstate.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentABService } from './../../../services/CRUD/ALIMENTOSBEBIDAS/approvalstateattachment.service';
import { RegisterProcedureService as RegisterProcedureABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerprocedure.service';

@NgModule({
  imports: [CommonModule,
    CKEditorModule,
    NgxBarcodeModule,
    AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
    TecnicoFinancieroRoutingModule,
    NgxQRCodeModule,
    NgbModule,
    Ng2TableModule,
    FormsModule],
  declarations: [TecnicoFinancieroComponent],
  providers: [NgbModal,
    UserService,
    DinardapService,
    DeclarationItemService,
    ConsultorService,
    RegisterProcedureABService,
    PayService,
    RegisterTypeABService,
    StateABService,
    RegisterStateABService,
    RegisterABService,
    ApprovalStateABService,
    ApprovalStateAttachmentService,
    ApprovalStateAttachmentABService,
    DeclarationItemCategoryService,
    DeclarationService,
    MailerService,
    RegisterStateService,
    TaxPayerTypeService,
    PayAttachmentService,
    StateAlojamientoService,
    RegistroCatastroService,
    RegisterProcedureService,
    PersonRepresentativeAttachmentService,
    EstablishmentCertificationService,
    ComplementaryServiceFoodTypeService,
    EstablishmentPropertyTypeService,
    RequisiteService,
    ApprovalStateService,
    ExporterService,
    AgreementService,
    UbicationService,
    RegisterService,
    PayTaxService,
    StateDeclarationService,
    CapacityTypeService,
    EstablishmentCertificationAttachmentService,
    EstablishmentPictureService,
    StateService,
    RucNameTypeService,
    ComplementaryServiceTypeService,
    GenderService,
    GroupTypeService,
    RegisterTypeService,
    WorkerGroupService,
    DeclarationAttachmentService,
    ZoneService,
    TariffTypeService,
    PreviewRegisterCodeService,
    EstablishmentCertificationTypeService,
    LanguageService,
    EstablishmentService,
    WorkerService,
    BedTypeService,
    SystemNameService,
    RucService]
})
export class TecnicoFinancieroModule {}
