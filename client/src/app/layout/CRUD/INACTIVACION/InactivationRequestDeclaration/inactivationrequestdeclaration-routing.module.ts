import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InactivationRequestDeclarationComponent } from './inactivationrequestdeclaration.component';

const routes: Routes = [
   {
      path: '',
      component: InactivationRequestDeclarationComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InactivationRequestDeclarationRoutingModule {}
