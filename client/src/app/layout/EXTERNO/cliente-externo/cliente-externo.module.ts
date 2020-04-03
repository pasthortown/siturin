import { RucComponent } from './../../CRUD/BASE/Ruc/ruc.component';
import { EstablishmentComponent } from './../../CRUD/BASE/Establishment/establishment.component';
import { DataComponent } from './../../client-data-components/data/data.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClienteExternoRoutingModule } from './cliente-externo-routing.module';
import { ClienteExternoComponent } from './cliente-externo.component';

@NgModule({
  imports: [CommonModule, ClienteExternoRoutingModule],
  declarations: [ClienteExternoComponent, DataComponent, EstablishmentComponent, RucComponent]
})
export class ClienteExternoModule {}
