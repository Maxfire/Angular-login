import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuItem } from '../interfaces/interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  templateMenu: MenuItem[] = [
    {
      text: 'User List',
      route: './users',
    },
  ];

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this._router.navigateByUrl('/auth');
    this._authService.logout();
  }
}
