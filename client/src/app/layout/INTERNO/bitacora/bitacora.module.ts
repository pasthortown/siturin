import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BitacoraRoutingModule } from './bitacora-routing.module';
import { BitacoraComponent } from './bitacora.component';

@NgModule({
  imports: [CommonModule, BitacoraRoutingModule],
  declarations: [BitacoraComponent]
})
export class BitacoraModule {}
