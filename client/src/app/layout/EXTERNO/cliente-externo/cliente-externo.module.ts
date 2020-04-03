import { RucDataComponent } from './../../client-data-components/ruc-data/ruc-data.component';
import { EstablishmentDataComponent } from './../../client-data-components/establishment-data/establishment-data.component';
import { DataComponent } from './../../client-data-components/data/data.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClienteExternoRoutingModule } from './cliente-externo-routing.module';
import { ClienteExternoComponent } from './cliente-externo.component';

@NgModule({
  imports: [CommonModule, ClienteExternoRoutingModule],
  declarations: [ClienteExternoComponent, DataComponent, EstablishmentDataComponent, RucDataComponent]
})
export class ClienteExternoModule {}
