import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NormativaComponent } from './normativa.component';

const routes: Routes = [
  {
    path: '',
    component: NormativaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NormativaRoutingModule {}
