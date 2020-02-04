import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BitacoraPageRoutingModule } from './bitacora-routing.module';
import { BitacoraPageComponent } from './bitacora.component';

@NgModule({
  imports: [CommonModule, BitacoraPageRoutingModule],
  declarations: [BitacoraPageComponent]
})
export class BitacoraPageModule {}
