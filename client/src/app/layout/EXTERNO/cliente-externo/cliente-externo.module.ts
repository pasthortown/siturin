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
    EstablishmentDataComponent, 
    RucDataComponent,
    TuristicDataComponent,
    DeclarationDataComponent,
    EstablishmentListDataComponent
  ]
})
export class ClienteExternoModule {}
