import { ClientDataModule } from './../../../../client-data-components/client-data.module';
import { CommonModule } from '@angular/common';
import { RegisterDataComponent } from './register-data.component';

@NgModule({
  imports: [CommonModule, 
    ClientDataModule
  ],
  declarations: [RegisterDataComponent],
  exports: [
    RegisterDataComponent
  ]
})
export class RegisterDataModule {}
