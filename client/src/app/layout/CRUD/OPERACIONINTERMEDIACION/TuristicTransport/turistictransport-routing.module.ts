import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuristicTransportComponent } from './turistictransport.component';

const routes: Routes = [
   {
      path: '',
      component: TuristicTransportComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TuristicTransportRoutingModule {}
