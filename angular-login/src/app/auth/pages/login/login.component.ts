import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = this._fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private _fb: FormBuilder, private _router: Router) {}

  ngOnInit(): void {}

  login() {
    console.log(this.myForm.value);
    console.log(this.myForm.valid);
    this._router.navigateByUrl('/dashboard');
  }
}
