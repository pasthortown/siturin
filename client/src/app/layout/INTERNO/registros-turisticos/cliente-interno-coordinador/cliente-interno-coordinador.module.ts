import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClienteInternoCoordinadorRoutingModule } from './cliente-interno-coordinador-routing.module';
import { ClienteInternoCoordinadorComponent } from './cliente-interno-coordinador.component';

@NgModule({
  imports: [CommonModule, ClienteInternoCoordinadorRoutingModule],
  declarations: [ClienteInternoCoordinadorComponent]
})
export class ClienteInternoCoordinadorModule {}
