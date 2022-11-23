import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {IsAuthenticatedGuard} from "./_guard/is-authenticated.guard";

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'register', component:RegistrationComponent },
  {
    path:'user',
    component:UserComponent,
    canActivate: [IsAuthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
