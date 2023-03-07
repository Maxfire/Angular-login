import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserResponse } from 'src/app/protected/interfaces/interface';
import { UserService } from 'src/app/protected/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [],
})
export class AddComponent implements OnInit {
  // Inicialización de formulario
  userForm: FormGroup = this._fb.group({
    name: ['Rafinha', [Validators.required]],
    email: ['r4f4@hotmail.com', [Validators.required, Validators.email]],
    password: ['112233', [Validators.required, Validators.minLength(6)]],
  });

  public user: UserResponse = {
    _id: '',
    name: 'example',
    email: 'example@mail.com',
    password: '112233',
  };
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        filter(({ id }) => !!id), // <-- Comprueba si hay id
        switchMap(({ id }) => this._userService.getById(id))
      )
      .subscribe((user) => {
        this.user = user;
        this.userForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        });
      });
  }

  // Guardado o actualización
  save() {
    const { name, email, password } = this.userForm.value;

    if (this.user._id) {
      // Update
      this._userService
        .update(this.user._id, name, email, password)
        .subscribe((resp) => {
          if (resp === true) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'El usuario ha sido actualizado!',
              showConfirmButton: false,
              timer: 1500,
            });
            this._router.navigateByUrl('dashboard/users');
          } else {
            Swal.fire('Error', resp, 'error');
          }
        });
    } else {
      // Add
      this._authService.register(name, email, password).subscribe((resp) => {
        if (resp === true) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El usuario ha sido añadido!',
            showConfirmButton: false,
            timer: 1500,
          });
          this._router.navigateByUrl('dashboard/users');
        } else {
          Swal.fire('Error', resp, 'error');
        }
      });
    }
  }
}
