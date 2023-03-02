import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/users/interfaces/usuarios.interface';
import { UsuariosService } from 'src/app/users/services/usuarios.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  model={
    id: 0,
    usuario: "",
    contrasena: ""
  }

  constructor(
    private usuarioSvc:UsuariosService,
    private router:Router
    ){}

    ngOnInit(): void {
      this.usuarioSvc.usuarioEdicion$
        .pipe(
          tap((usuario: Usuario) => {
            this.model.id = usuario.id;
            this.model.usuario = usuario.usuario;
            this.model.contrasena = usuario.contrasena;;
          })
        )
        .subscribe()
    }
  
  
  onSubmit({value:formData}:NgForm): void{
    const datosFormulario:Usuario ={
      ...formData    
    }
    
    this.usuarioSvc.editarUsuario(datosFormulario)
    .pipe(
      tap(() => this.router.navigate(['/users']))
    )
    .subscribe();
  }



}

