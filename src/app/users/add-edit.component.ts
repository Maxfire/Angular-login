import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // Reglas de validación del formulario
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      // Solo se solicita la contraseña en caso de añadir un usuario
      password: [
        '',
        [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])],
      ],
    });

    this.title = 'Add User';
    if (this.id) {
      // Método de edición
      this.title = 'Edit User';
      this.loading = true;
      this.accountService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
  }

  // Get para recoger los campos del formulario de manera sencilla
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Se reinician las alertas en el envío del formulario
    this.alertService.clear();

    // Se detiene aquí si el formulario no es válido
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveUser()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Usuario guardado', {
            keepAfterRouteChange: true,
          });
          this.router.navigateByUrl('/users');
        },
        error: (error) => {
          this.alertService.error(error);
          this.submitting = false;
        },
      });
  }

  private saveUser() {
    // Crear o actualizar el usuario basado en los parámetros introducidos
    return this.id
      ? this.accountService.update(this.id!, this.form.value)
      : this.accountService.register(this.form.value);
  }
}
