import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesRepresentativeComponent } from './salesrepresentative.component';

const routes: Routes = [
   {
      path: '',
      component: SalesRepresentativeComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class SalesRepresentativeRoutingModule {}
