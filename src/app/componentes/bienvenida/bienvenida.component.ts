import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/users/services/usuarios.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {
  usuario$ = this.usuarioSvc.usuarioSesion$

  constructor(private usuarioSvc: UsuariosService) {}

  ngOnInit(): void {
  }

}
