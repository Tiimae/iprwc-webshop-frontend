import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAddresComponent } from './create-addres/create-addres.component';
import { AllAddressesComponent } from './all-addresses/all-addresses.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { UserAddressResolverService } from '../../../_service/_resolver/userAddress-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AllAddressesComponent
  },
  {
    path: 'create',
    component: CreateAddresComponent,
    data: {
      breadcrumb: 'Create'
    }
  },
  {
    path: ':addressId',
    component: UpdateAddressComponent,
    data: {
      breadcrumb: (data: any) =>
        `${data.address.street} ${data.address.houseNumber}`
    },
    resolve: { address: UserAddressResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressesRoutingModule {}
