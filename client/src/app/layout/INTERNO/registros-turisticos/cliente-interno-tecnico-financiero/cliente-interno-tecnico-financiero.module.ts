import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClienteInternoTecnicoFinancieroRoutingModule } from './cliente-interno-tecnico-financiero-routing.module';
import { ClienteInternoTecnicoFinancieroComponent } from './cliente-interno-tecnico-financiero.component';

@NgModule({
  imports: [CommonModule, ClienteInternoTecnicoFinancieroRoutingModule],
  declarations: [ClienteInternoTecnicoFinancieroComponent]
})
export class ClienteInternoTecnicoFinancieroModule {}
