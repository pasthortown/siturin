import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InactivationRequestComponent } from './inactivationrequest.component';

const routes: Routes = [
   {
      path: '',
      component: InactivationRequestComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InactivationRequestRoutingModule {}
