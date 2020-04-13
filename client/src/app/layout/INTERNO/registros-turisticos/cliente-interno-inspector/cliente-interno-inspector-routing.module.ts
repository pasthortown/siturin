import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteInternoInspectorComponent } from './cliente-interno-inspector.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteInternoInspectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteInternoInspectorRoutingModule {}
