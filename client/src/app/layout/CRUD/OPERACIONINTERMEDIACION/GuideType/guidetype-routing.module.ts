import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuideTypeComponent } from './guidetype.component';

const routes: Routes = [
   {
      path: '',
      component: GuideTypeComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class GuideTypeRoutingModule {}
