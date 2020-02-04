import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BitacoraPageRoutingModule } from './bitacora-page-routing.module';
import { BitacoraPageComponent } from './bitacora-page.component';

@NgModule({
  imports: [CommonModule, BitacoraPageRoutingModule],
  declarations: [BitacoraPageComponent]
})
export class BitacoraPageModule {}
