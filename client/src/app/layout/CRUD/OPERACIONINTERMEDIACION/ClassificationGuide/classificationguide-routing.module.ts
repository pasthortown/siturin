import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationGuideComponent } from './classificationguide.component';

const routes: Routes = [
   {
      path: '',
      component: ClassificationGuideComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ClassificationGuideRoutingModule {}
