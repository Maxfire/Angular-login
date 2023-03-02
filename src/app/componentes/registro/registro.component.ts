import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/users/interfaces/usuarios.interface';
import { UsuariosService } from 'src/app/users/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  model={
    usuario: "",
    contrasena: ""
  }


  constructor(
    private usuarioSvc:UsuariosService,
    private router:Router
    ){}
 
  
  onSubmit({value:formData}:NgForm): void{
    const datosFormulario:Usuario ={
      ...formData    
    }
    
    this.usuarioSvc.guardarUsuario(datosFormulario)
    .pipe(
      tap(() => this.router.navigate(['/account/login']))
    )
    .subscribe();
  }



}
