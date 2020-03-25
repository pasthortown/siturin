import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryTransportComponent } from './categorytransport.component';

const routes: Routes = [
   {
      path: '',
      component: CategoryTransportComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class CategoryTransportRoutingModule {}
