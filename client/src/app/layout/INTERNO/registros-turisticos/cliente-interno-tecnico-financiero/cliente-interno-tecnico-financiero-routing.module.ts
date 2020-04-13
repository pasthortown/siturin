import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteInternoTecnicoFinancieroComponent } from './cliente-interno-tecnico-financiero.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteInternoTecnicoFinancieroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteInternoTecnicoFinancieroRoutingModule {}
