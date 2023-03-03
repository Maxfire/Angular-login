import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  logout() {
    this._router.navigateByUrl('/auth');
  }
}
