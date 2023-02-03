import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './_guard/is-authenticated.guard';
import { HasRoleGuard } from './_guard/has-role.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./webshop/webshop-routing.module').then(
        (m) => m.WebshopRoutingModule
      ),
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
    data: { breadcrumb: 'Auth' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (m) => m.DashboardRoutingModule
      ),
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      roles: ['Owner', 'Admin', 'User'],
      breadcrumb: 'Dashboard'
    }
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
