import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BitacoraPageComponent } from './bitacora-page.component';

const routes: Routes = [
  {
    path: '',
    component: BitacoraPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraPageRoutingModule {}
