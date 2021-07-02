import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

  @Input() width?: string
  @Input() height?: string
  @Input() buttons: any

  keys: any[]
  labels:any = [{}]
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
    this.pegaButtons()
  }


  close() {
    this.el.nativeElement.classList.remove('sshow')
    this.el.nativeElement.classList.add('hhiden')
  }

  pegaButtons() {
    // Object.keys(this.buttons).forEach(control => {
    //   console.log(control)
    // })


    Object.keys(this.buttons).forEach((teste) => {
      let teste2 = this.buttons[teste] as any
      let teste12 = teste
      if (!this.labels[teste12 as any]) {
        this.labels[teste as any] = []
      }
      this.keys.push(teste12)
      this.labels[teste as any] = teste2

    })

    console.log(this.labels)
    console.log(this.keys)
    // if (this.buttons) {
    //   console.log(typeof(this.buttons))
    // }

  }
}
