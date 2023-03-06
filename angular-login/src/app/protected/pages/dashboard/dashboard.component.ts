import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {

  get user() {
    return this._authService.user;
  }

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this._router.navigateByUrl('/auth');
    this._authService.logout();
  }
}
