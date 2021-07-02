import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'http';

  buttons = { primary: 'label', secondary: 'label2' }
  constructor() { }


  // MODAL

  @ViewChild('modal_1') modal_1: TemplateRef<any>;
  //  @ViewChild('vc') vc: ViewContainerRef;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
  showDialog() {
    let view = this.modal_1.createEmbeddedView(null);
    this.vc.insert(view)
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove('hhidden');
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add('sshow');
  }

  closeDialog() {
    this.vc.clear()
  }
}
