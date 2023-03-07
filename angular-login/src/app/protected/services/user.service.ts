import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponse, User, UserResponse } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.ApiUrl;
  public users: User[] = [];
  constructor(private _http: HttpClient) {}

  // Listar todos los usuarios
  list() {
    const url = `${this.baseUrl}/users`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this._http.get<UserResponse[]>(url, { headers });
  }

  // Usuario por Id
  getById(id: string) {
    const url = `${this.baseUrl}/users/${id}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this._http.get<UserResponse>(url, { headers });
  }

  // Actualizar usuario
  update(id: string, name?: string, email?: string, password?: string) {
    const url = `${this.baseUrl}/users/${id}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    const body = { name, email, password };
    return this._http.put<GeneralResponse>(url, body, { headers }).pipe(
      tap((resp) => {
        if (resp.ok === true) {
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  // Borrar usuario
  delete(id: string) {
    const url = `${this.baseUrl}/users/${id}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this._http.delete<GeneralResponse>(url, { headers }).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }
}
