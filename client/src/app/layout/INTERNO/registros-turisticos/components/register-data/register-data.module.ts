import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDataModule } from './../../../../client-data-components/client-data.module';
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
