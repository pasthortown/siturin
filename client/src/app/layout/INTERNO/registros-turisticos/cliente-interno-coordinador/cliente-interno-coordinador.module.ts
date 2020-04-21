import { CoordinadorEntregaDataComponent } from './../components/coordinador/coordinador-entrega-data - copia/coordinador-entrega-data.component';
import { CoordinadorAsignacionDataComponent } from './../components/coordinador/coordinador-asignacion-data/coordinador-asignacion-data.component';
import { CoordinadorGestionDataComponent } from './../components/coordinador/coordinador-gestion-data/coordinador-gestion-data.component';
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
import { ClienteInternoCoordinadorRoutingModule } from './cliente-interno-coordinador-routing.module';
import { RegisterDataModule } from './../components/register-data/register-data.module';

import { CoordinadorBandejasDataComponent } from './../components/coordinador/coordinador-bandejas-data/coordinador-bandejas-data.component';
import { ClienteInternoCoordinadorComponent } from './cliente-interno-coordinador.component';

import { UserService } from 'src/app/services/profile/user.service';
import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { StateService as StateALService} from 'src/app/services/CRUD/ALOJAMIENTO/state.service';
import { StateService as StateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/state.service';
import { StateService as StateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/state.service';
import { AuthLocationService } from 'src/app/services/CRUD/AUTH/authlocation.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';

import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { RegisterProcedureService as RegisterProcedureALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerprocedure.service';
import { ApprovalStateService as ApprovalStateALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstate.service';
import { ApprovalStateService as ApprovalStateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstate.service';
import { ApprovalStateService as ApprovalStateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstate.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstateattachment.service';
import { RegisterStateService as RegisterStateALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerstate.service';
import { RegisterStateService as RegisterStateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerstate.service';
import { RegisterStateService as RegisterStateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerstate.service';
import { ZoneService } from 'src/app/services/CRUD/BASE/zone.service';
import { ExporterService } from 'src/app/services/negocio/exporter.service';
import { MailerService } from 'src/app/services/negocio/mailer.service';

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
    RegisterDataModule,
  ],
  declarations: [ClienteInternoCoordinadorComponent, CoordinadorGestionDataComponent, CoordinadorBandejasDataComponent, CoordinadorAsignacionDataComponent, CoordinadorEntregaDataComponent],
  providers: [
    UserService,
    ConsultorService,
    StateALService,
    StateABService,
    StateOPService,
    AuthLocationService,
    UbicationService,
    DinardapService,
    RegisterProcedureALService,
    RegisterProcedureABService,
    RegisterProcedureOPService,
    ApprovalStateALService,
    ApprovalStateABService,
    ApprovalStateOPService,
    ApprovalStateAttachmentALService,
    ApprovalStateAttachmentABService,
    ApprovalStateAttachmentOPService,
    RegisterStateALService,
    RegisterStateABService,
    RegisterStateOPService,
    ZoneService,
    ExporterService,
    MailerService
  ]
})
export class ClienteInternoCoordinadorModule {}
