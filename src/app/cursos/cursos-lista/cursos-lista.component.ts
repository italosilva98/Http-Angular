import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[] = [];
  // bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursoSelecionado: Curso;
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  modalShow: boolean;

  constructor(
    private service: Cursos2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.service.list().subscribe(curso => this.cursos = curso)
    this.modalShow = false;
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.log(error);
        // this.error$.next(true);
        // this.handleError()
        return EMPTY;
      })
    );

    // this.service.list()
    // .pipe(
    //   catchError(error => empty())
    // )
    // .subscribe(
    //   dados => {
    //     console.log(dados);
    //   }
    //   // ,error => console.error(error),
    //   // () => console.log('Obserservable completo!')
    // );
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });

  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {
    //   class: 'modal-sm',
    // });

    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse curso?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.service.remove(curso.id) : EMPTY))
      )
      .subscribe(
        (success) => {
          this.alertService.showAlertSuccess('Curso removido com sucesso.');
          this.onRefresh();
        },
        (error) => {
          this.alertService.showAlertDanger(
            'Erro ao remover curso. Tente novamente mais tarde.'
          );
        }
      );
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      (success) => {
        this.alertService.showAlertSuccess('Curso removido com sucesso.');
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      (error) => {
        this.alertService.showAlertDanger(
          'Erro ao remover curso. Tente novamente mais tarde.'
        );
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  onModal(){
    this.modalShow = true
  }
}
