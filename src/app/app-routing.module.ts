import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {HomeComponent} from "./webshop/home/home.component";
import {IsAuthenticatedGuard} from "./_guard/is-authenticated.guard";
import {HasRoleGuard} from "./_guard/has-role.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthComponent} from "./auth/auth.component";
import {WebshopComponent} from "./webshop/webshop.component";

const routes: Routes = [
  {
    path:'',
    component:WebshopComponent,
    loadChildren: () => import('./webshop/webshop-routing.module').then(m => m.WebshopRoutingModule)
  },
  {
    path: 'auth',
    component:AuthComponent,
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      roles: [
        'Owner',
        'Admin',
        'User'
      ]
    }
  },
  { path: '**', pathMatch: 'full',
    component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
