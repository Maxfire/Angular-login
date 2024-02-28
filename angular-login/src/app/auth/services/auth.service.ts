import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/app/protected/interfaces/interface';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.ApiUrl;
  private _user!: User;

  // Getter datos del usuario
  get user() {
    return { ...this._user };
  }

  constructor(private _http: HttpClient) {}

  // Función login
  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };
    return this._http.post<AuthResponse>(url, body).pipe(
      // Con tap realizamos acciones secundarias, en este caso si la respuesta es correcta guardamos los datos del usuario
      tap((resp) => {
        if (resp.ok === true) {
          this.setUserData(resp.token!, resp.uid!, resp.name!, email);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  // Función logout
  logout() {
    localStorage.clear();
  }

  // Función register
  register(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = { email, password, name };
    return this._http.post<AuthResponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  // Función para validar el token del usuario
  validateToken() {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || '' 
    );
    return this._http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        this.setUserData(resp.token!, resp.uid!, resp.name!, resp.email!);
        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  // Función para actualizar datos del usuario y guardar token
  setUserData(token: string, uid: string, name: string, email?: string) {
    localStorage.setItem('token', token!);

    this._user = {
      uid: uid!,
      name: name!,
      email: email!,
    };
  }
}
