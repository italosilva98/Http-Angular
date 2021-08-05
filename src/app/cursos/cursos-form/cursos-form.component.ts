import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cursosService: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Metodo "feio", tem q fazer unsubscribe em todo subscribe
    // this.route.params.subscribe((params: any) => {
    //   const id = params['id'];
    //   console.log(id);
    //   const curso$ = this.cursosService.loadByID(id);
    //   curso$.subscribe((curso) => {
    //     this.updateForm(curso)
    //   });
    // });

    // Metodo refatorado, n precisa fazer o unsubscribe manualmente, poir o angular faz isso automático no route, sem utilizar resolver
    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap((id) => this.cursosService.loadByID(id))
    //   )
    //   .subscribe(curso => this.updateForm(curso));

    const curso = this.route.snapshot.data['curso']; //tem os dados do form
    this.createForm(curso);
  }

  createForm(curso: any) {
    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';

      if (this.form.value.id) {
        //update
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente novamente!';
      }

      // utilizando método save, criado no service
      this.cursosService.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back()
        },
        error => this.modal.showAlertDanger(msgError)
      );

      // Utilizando os dois servicos, de create e update
      // if (this.form.value.id) {
      //   //update
      //   msgSuccess = 'Curso atualizado com sucesso!';
      //   msgError = 'Erro ao atualizar curso, tente novamente!';
      //   this.cursosService.update(this.form.value).subscribe(
      //     (success) => {
      //       this.modal.showAlertSuccess(msgSuccess);
      //       this.location.back();
      //     },
      //     (error) => this.modal.showAlertDanger(msgError)
      //   );
      // } else {
      //   this.cursosService.create(this.form.value).subscribe(
      //     (success) => {
      //       this.modal.showAlertSuccess(msgSuccess);
      //       this.location.back();
      //     },
      //     (error) => this.modal.showAlertDanger(msgError)
      //   );
      // }


    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();

    console.log('cancel');
  }

  // com a implementação do Resolve, n precisa desse método
  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome,
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }
}
