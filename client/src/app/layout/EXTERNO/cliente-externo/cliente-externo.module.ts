import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClienteExternoRoutingModule } from './cliente-externo-routing.module';
import { ClienteExternoComponent } from './cliente-externo.component';

@NgModule({
  imports: [CommonModule, ClienteExternoRoutingModule],
  declarations: [ClienteExternoComponent]
})
export class ClienteExternoModule {}
