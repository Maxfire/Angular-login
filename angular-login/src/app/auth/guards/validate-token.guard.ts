import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  // Este método se ejecuta cuando se quiere acceder a una ruta protegida por este guard
  canActivate(): Observable<boolean> | boolean {
    return this.checkTokenValidity();
  }

  // Este método se ejecuta cuando se quiere cargar un módulo protegido por este guard
  canLoad(): Observable<boolean> | boolean {
    return this.checkTokenValidity();
  }

  // Método privado que valida si el token del usuario es válido
  private checkTokenValidity(): Observable<boolean> {
    return this._authService.validateToken().pipe(
      tap((valid) => {
        if (!valid) {
          this._router.navigateByUrl('/auth');
        }
      })
    );
  }
}
