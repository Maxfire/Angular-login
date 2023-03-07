import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  // Inicialización del formulario
  myForm: FormGroup = this._fb.group({
    name: ['name', [Validators.required, Validators.minLength(4)]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {}

  // Registro
  save() {
    const { name, email, password } = this.myForm.value;
    this._authService.register(name, email, password).subscribe((resp) => {
      if (resp === true) {
        this._router.navigateByUrl('/login');
      } else {
        Swal.fire('Error', resp, 'error');
      }
    });
  }
}
