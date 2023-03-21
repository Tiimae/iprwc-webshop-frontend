import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {RequestVerifyComponent} from './request-verify/request-verify.component';
import {IsNotVerifiedGuard} from '../_guard/is-not-verified.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: 'Login'
    },
  },
  {
    path: 'register',
    component: RegistrationComponent,
    data: {
      breadcrumb: 'Register'
    },
  },
  {
    path: 'reset',
    component: ForgotPasswordComponent,
    data: {
      breadcrumb: 'Reset password'
    },
  },
  {
    path: 'set-new-password',
    component: ResetPasswordComponent,
    data: {
      breadcrumb: 'New password'
    },
  },
  {
    path: 'verify-request',
    component: RequestVerifyComponent,
    canActivate: [IsNotVerifiedGuard],
    data: {
      breadcrumb: 'Verify'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
