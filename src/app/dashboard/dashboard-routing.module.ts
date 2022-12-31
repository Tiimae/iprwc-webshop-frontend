import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsAuthenticatedGuard} from "../_guard/is-authenticated.guard";
import {HasRoleGuard} from "../_guard/has-role.guard";

const routes: Routes = [
  {
    path:'user',
    loadChildren: () => import('./user/user-routing.module').then(m => m.UserRoutingModule),
    canActivate: [IsAuthenticatedGuard],
  },

  {
    path:'admin',
    loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      roles: [
        'Owner',
        'Admin'
      ]
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
