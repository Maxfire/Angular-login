import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  // Inicialización del formulario
  myForm: FormGroup = this._fb.group({
    email: ['quizasdudas@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {}

  // Login
  login() {
    const { email, password } = this.myForm.value;
    this._authService.login(email, password).subscribe((resp) => {
      if (resp === true) {
        this._router.navigateByUrl('/dashboard');
      } else {
        Swal.fire('Error', resp, 'error');
      }
    });
  }
}
