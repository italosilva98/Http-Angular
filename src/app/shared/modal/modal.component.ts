import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

  @Input() width?: string
  @Input() height?: string
  // @Input() buttons: any

  keys: any[] = []
  labels = {}
  tamanho: {}


  constructor(private el: ElementRef) { }

  ngOnInit() {
    // we added this so that when the backdrop is clicked, the modal is closed
    this.el.nativeElement.addEventListener('click', () => {
      this.close()
    })

    this.tamanho =
      { width: this.width, height: this.height }
  }

  ngAfterViewInit(): void {
  }


  close() {
    this.el.nativeElement.classList.remove('modal-show')
    this.el.nativeElement.classList.add('modal-hidden')
  }
}
