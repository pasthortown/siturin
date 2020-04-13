import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteInternoCoordinadorComponent } from './cliente-interno-coordinador.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteInternoCoordinadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteInternoCoordinadorRoutingModule {}
