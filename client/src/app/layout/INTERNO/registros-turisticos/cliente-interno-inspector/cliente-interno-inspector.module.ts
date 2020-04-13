import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClienteInternoInspectorRoutingModule } from './cliente-interno-inspector-routing.module';
import { ClienteInternoInspectorComponent } from './cliente-interno-inspector.component';

@NgModule({
  imports: [CommonModule, ClienteInternoInspectorRoutingModule],
  declarations: [ClienteInternoInspectorComponent]
})
export class ClienteInternoInspectorModule {}
