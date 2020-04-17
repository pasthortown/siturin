import { InspectorGestionDataComponent } from './../components/inspector/inspector-gestion-data/inspector-gestion-data.component';
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
import { ClienteInternoInspectorRoutingModule } from './cliente-interno-inspector-routing.module';
import { RegisterDataModule } from './../components/register-data/register-data.module';

import { InspectorBandejasDataComponent } from './../components/inspector/inspector-bandejas-data/inspector-bandejas-data.component';
import { ClienteInternoInspectorComponent } from './cliente-interno-inspector.component';

import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { StateService as StateALService} from 'src/app/services/CRUD/ALOJAMIENTO/state.service';
import { StateService as StateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/state.service';
import { StateService as StateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/state.service';
import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { RegisterProcedureService as RegisterProcedureALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerprocedure.service';
import { ZoneService } from 'src/app/services/CRUD/BASE/zone.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { MailerService } from 'src/app/services/negocio/mailer.service';
import { UserService } from 'src/app/services/profile/user.service';
import { RegisterStateService as RegisterStateALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerstate.service';
import { RegisterStateService as RegisterStateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerstate.service';
import { RegisterStateService as RegisterStateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerstate.service';
import { ApprovalStateService as ApprovalStateALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstate.service';
import { ApprovalStateService as ApprovalStateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstate.service';
import { ApprovalStateService as ApprovalStateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstate.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstateattachment.service';
import { ApprovalStateReportService as ApprovalStateReportALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstatereport.service';
import { ApprovalStateReportService as ApprovalStateReportABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstatereport.service';
import { ApprovalStateReportService as ApprovalStateReportOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstatereport.service';
import { ExporterService } from 'src/app/services/negocio/exporter.service';
import { DocumentService } from 'src/app/services/CRUD/EXPORTER/document.service';
import { RegisterService as RegisterALService } from 'src/app/services/CRUD/ALOJAMIENTO/register.service';
import { RegisterService as RegisterABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/register.service';
import { RegisterService as RegisterOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { EstablishmentService } from 'src/app/services/CRUD/BASE/establishment.service';
import { CapacityTypeService as CapacityTypeALService } from 'src/app/services/CRUD/ALOJAMIENTO/capacitytype.service';
import { GenderService } from 'src/app/services/CRUD/BASE/gender.service';
import { WorkerGroupService } from 'src/app/services/CRUD/BASE/workergroup.service';
import { RequisiteService as RequisiteOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/requisite.service';
import { RequisiteService as RequisiteALService } from 'src/app/services/CRUD/ALOJAMIENTO/requisite.service';
import { RequisiteService as RequisiteABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/requisite.service';
import { RucNameTypeService } from 'src/app/services/CRUD/BASE/rucnametype.service';
import { ComplementaryServiceFoodTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/complementaryservicefoodtype.service';

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
    ClienteInternoInspectorRoutingModule,
    RegisterDataModule,
  ],
  declarations: [ClienteInternoInspectorComponent, InspectorGestionDataComponent,InspectorBandejasDataComponent],
  providers: [
    UserService,
    RucNameTypeService,
    EstablishmentService,
    ConsultorService,
    StateALService,
    StateABService,
    StateOPService,
    UbicationService,
    DinardapService,
    RegisterProcedureALService,
    RegisterProcedureABService,
    RegisterProcedureOPService,
    ZoneService,
    CapacityTypeALService,
    MailerService,
    GenderService,
    ComplementaryServiceFoodTypeService,
    WorkerGroupService,
    RegisterStateALService,
    RegisterStateABService,
    RegisterStateOPService,
    ApprovalStateALService,
    ApprovalStateABService,
    ApprovalStateOPService,
    ApprovalStateAttachmentALService,
    ApprovalStateAttachmentABService,
    ApprovalStateAttachmentOPService,
    ApprovalStateReportALService,
    ApprovalStateReportABService,
    ApprovalStateReportOPService,
    ExporterService,
    DocumentService,
    RegisterALService,
    RegisterABService,
    RegisterOPService,
    RequisiteOPService,
    RequisiteALService,
    RequisiteABService
  ]
})
export class ClienteInternoInspectorModule {}
