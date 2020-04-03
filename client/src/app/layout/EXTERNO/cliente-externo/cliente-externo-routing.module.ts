import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteExternoComponent } from './cliente-externo.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteExternoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteExternoRoutingModule {}
