import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ModalComponent } from './modal/modal.component'
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule,

  ],
  declarations: [AlertModalComponent, ModalComponent, ConfirmModalComponent],
  exports: [AlertModalComponent, ModalComponent],
  entryComponents: [AlertModalComponent, ConfirmModalComponent] //quando o componente é chamado em tempo de execução
})
export class SharedModule { }
