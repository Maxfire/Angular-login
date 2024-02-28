import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddComponent } from './pages/user/add/add.component';
import { ListComponent } from './pages/user/list/list.component';
import { UserMainComponent } from './pages/user/user-main/user-main.component';

const routes: Routes = [
  {
    path: '',
    component: UserMainComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: ListComponent },
      { path: 'users/add', component: AddComponent },
      { path: 'users/edit/:id', component: AddComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
