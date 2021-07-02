import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ModalComponent } from './modal/modal.component'

@NgModule({
  imports: [
    CommonModule,

  ],
  declarations: [AlertModalComponent, ModalComponent],
  exports: [AlertModalComponent, ModalComponent],
  entryComponents: [AlertModalComponent]
})
export class SharedModule { }
