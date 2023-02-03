import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasRoleGuard } from '../_guard/has-role.guard';
import { IsAuthenticatedGuard } from '../_guard/is-authenticated.guard';
import { IsVerifiedGuard } from '../_guard/is-verified.guard';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user-routing.module').then((m) => m.UserRoutingModule),
    canActivate: [IsAuthenticatedGuard, IsVerifiedGuard],
    data: {
      breadcrumb: 'User'
    }
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
    canActivate: [IsAuthenticatedGuard, HasRoleGuard, IsVerifiedGuard],
    data: {
      roles: ['Owner', 'Admin'],
      breadcrumb: 'Admin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
