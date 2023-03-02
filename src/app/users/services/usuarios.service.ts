import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { Usuario } from '../interfaces/usuarios.interface'

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiURL = 'http://localhost:3000/usuarios'

  private usuarioSesion = new BehaviorSubject<string>("")

  private usuarioEdicion = new BehaviorSubject<Usuario>({
    id: 0,
    usuario: '',
    contrasena: '',
  })

  constructor(private http: HttpClient) {}

  //los observables represnetan una colección de futuros valores o datos.
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiURL)
  }

  get usuarioSesion$(): Observable<string> {
    return this.usuarioSesion.asObservable()
  }

  setUsuarioSesion$(usuario: Usuario): void {
    this.usuarioSesion.next(usuario.usuario)
  }

  get usuarioEdicion$(): Observable<Usuario> {
    return this.usuarioEdicion.asObservable()
  }

  setUsuarioEdicion$(usuario: Usuario): void {
    this.usuarioEdicion.next(usuario)
  }

  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiURL, usuario)
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    console.log(usuario);
    return this.http.put<Usuario>(`${this.apiURL}/${usuario.id}`, usuario)
  }

  borrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiURL}/${usuario.id}`)
  }
}
