import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllUsersComponent} from './all-users/all-users.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {UserResolverService} from '../../../_service/_resolver/user-resolver.service';

const routes: Routes = [
  { path: '', component: AllUsersComponent },
  {
    path: 'create',
    component: CreateUserComponent,
    data: {
      breadcrumb: 'Create'
    }
  },
  {
    path: ':userId',
    component: UpdateUserComponent,
    data: {
      breadcrumb: (data: any) =>
        `${data.user.firstName} ${data.user.middleName} ${data.user.lastName} `
    },
    resolve: { user: UserResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
