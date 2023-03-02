import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'
import { Usuario } from './interfaces/usuarios.interface'

import { UsuariosService } from './services/usuarios.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usuarios!: Usuario[];
  constructor(
    private usuarioSvc: UsuariosService,
    private router:Router) {}
  
    ngOnInit(): void {
    this.usuarioSvc
      .getUsuarios()
      .pipe(tap((usuarios: Usuario[]) => this.usuarios=usuarios))
      .subscribe()
  }

  editarUsuario(usuario:Usuario):void{
    this.usuarioSvc.setUsuarioEdicion$(usuario);
    this.router.navigate(['/users/data']);
  }
  
  eliminarUsuario(usuario:Usuario):void{
    this.usuarioSvc.borrarUsuario(usuario)
    .pipe(
      tap(() => this.ngOnInit())
    )
    .subscribe();
  }
}
