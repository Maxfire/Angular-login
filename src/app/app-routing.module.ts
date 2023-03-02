import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { DatosComponent } from './users/datos/datos.component';

const routes: Routes = [
  { path: "account/login", component: LoginComponent },
  { path: "account/register", component: RegistroComponent },
  { path: "", component: BienvenidaComponent },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'users/data', component: DatosComponent},
  { path: "**", redirectTo: "account/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
