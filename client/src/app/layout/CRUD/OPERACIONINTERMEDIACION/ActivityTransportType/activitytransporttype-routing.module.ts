import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityTransportTypeComponent } from './activitytransporttype.component';

const routes: Routes = [
   {
      path: '',
      component: ActivityTransportTypeComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ActivityTransportTypeRoutingModule {}
