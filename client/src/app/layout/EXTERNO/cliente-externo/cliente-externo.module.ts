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
  imports: [CommonModule, ClienteExternoRoutingModule],
  declarations: [ClienteExternoComponent, 
    EstablishmentDataComponent, 
    RucDataComponent,
    TuristicDataComponent,
    DeclarationDataComponent,
    EstablishmentListDataComponent
  ]
})
export class ClienteExternoModule {}
