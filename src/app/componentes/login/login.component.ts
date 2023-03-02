import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/users/interfaces/usuarios.interface';
import { UsuariosService } from 'src/app/users/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  model={
    usuario: "",
    contrasena: ""
  }
  usuarios: Usuario[] =[]

  constructor(private usuarioSvc:UsuariosService, private router: Router){}

  ngOnInit(): void{
    this.getUsuarios();
  } 
    

  onSubmit({value:formData}:NgForm){
    
    const encontrados = this.usuarios
    .filter(user => 
      formData.usuario === user.usuario &&
      formData.contrasena === user.contrasena
    )

    if(encontrados.length > 0) {
      this.usuarioSvc.setUsuarioSesion$(encontrados[0]);
      this.router.navigate(['/']);
    }

  }

   private getUsuarios():void{
    this.usuarioSvc.getUsuarios().pipe(
      tap((usuarios: Usuario[]) =>this.usuarios = usuarios))
    .subscribe()
  }

}
