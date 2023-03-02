import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../interfaces/usuarios.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // el decorador @input(), sirve para declarar parámetros de entrada.
  @Input() usuario!: Usuario;
  @Output() editarUsuario= new EventEmitter<Usuario>();
  @Output() eliminarUsuario= new EventEmitter<Usuario>();
  ngOnInit(): void {
  
  }

  editar(): void {
    this.editarUsuario.emit(this.usuario);
  }

  eliminar(): void {
    this.eliminarUsuario.emit(this.usuario);
  }
}
