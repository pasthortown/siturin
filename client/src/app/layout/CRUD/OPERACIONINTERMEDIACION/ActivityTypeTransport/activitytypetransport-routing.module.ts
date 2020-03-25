import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityTypeTransportComponent } from './activitytypetransport.component';

const routes: Routes = [
   {
      path: '',
      component: ActivityTypeTransportComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ActivityTypeTransportRoutingModule {}
