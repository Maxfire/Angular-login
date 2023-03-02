import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UsuariosService } from 'src/app/users/services/usuarios.service'

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  usuario$ = this.usuarioSvc.usuarioSesion$

  constructor(private router: Router, private usuarioSvc: UsuariosService) {}

  ngOnInit(): void {}

  navegar(url: string): void {
    this.router.navigate([url])
  }
  cerrarSesion(): void {
    const vacio = { id: 0, usuario: '', contrasena: '' }
    this.usuarioSvc.setUsuarioSesion$(vacio)
    this.ngOnInit()
    this.router.navigate(['/account/login'])
  }
}
