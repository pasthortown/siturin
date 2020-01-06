import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InactivationRequestAttachmentComponent } from './inactivationrequestattachment.component';

const routes: Routes = [
   {
      path: '',
      component: InactivationRequestAttachmentComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InactivationRequestAttachmentRoutingModule {}
