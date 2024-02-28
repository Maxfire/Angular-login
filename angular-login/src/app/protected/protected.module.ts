import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserMainComponent } from './pages/user/user-main/user-main.component';
import { ListComponent } from './pages/user/list/list.component';
import { AddComponent } from './pages/user/add/add.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    UserMainComponent,
    ListComponent,
    AddComponent,
  ],
  imports: [CommonModule, ProtectedRoutingModule, SharedModule, ReactiveFormsModule],
})
export class ProtectedModule {}
