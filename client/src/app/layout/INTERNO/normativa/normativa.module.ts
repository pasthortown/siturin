import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NormativaRoutingModule } from './normativa-routing.module';
import { NormativaComponent } from './normativa.component';

@NgModule({
  imports: [CommonModule, NormativaRoutingModule,
  FormsModule],
  declarations: [NormativaComponent]
})
export class NormativaModule {}
