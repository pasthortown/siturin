import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BitacoraRoutingModule } from './bitacora-routing.module';
import { BitacoraComponent } from './bitacora.component';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule,
    BitacoraRoutingModule,
    FormsModule, 
    NgbModule,
    Ng2TableModule,
    HttpModule],
  declarations: [BitacoraComponent]
})
export class BitacoraModule {}
