import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/protected/interfaces/interface';
import { UserService } from 'src/app/protected/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent implements OnInit {
  public users: UserResponse[] = [];

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.reloadUsers();
  }

  deleteUser(userId: string) {
    Swal.fire({
      title: 'Estás segur@?',
      text: 'No podrás dar marcha atrás!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, fulminalo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.delete(userId).subscribe((resp) => {
          Swal.fire('Fulminado!', resp.msg, 'success');
          this.reloadUsers();
        });
      }
    });
  }

  reloadUsers() {
    this._userService.list().subscribe((resp) => {
      this.users = resp;
    });
  }
}
