import { InspectorBandejasDataComponent } from './../components/inspector/inspector-bandejas-data/inspector-bandejas-data.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClienteInternoInspectorRoutingModule } from './cliente-interno-inspector-routing.module';
import { ClienteInternoInspectorComponent } from './cliente-interno-inspector.component';

@NgModule({
  imports: [CommonModule, ClienteInternoInspectorRoutingModule],
  declarations: [ClienteInternoInspectorComponent, InspectorBandejasDataComponent]
})
export class ClienteInternoInspectorModule {}
