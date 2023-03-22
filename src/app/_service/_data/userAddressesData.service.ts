import {Injectable} from '@angular/core';
import {AxiosResponse} from 'axios';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, Subject} from 'rxjs';
import {UserAddressesModel} from 'src/app/_models/userAddresses.model';
import {ApiMethodsService} from '../_api/api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class UserAddressesDataService {
  private userAddresses: UserAddressesModel[] = [];
  public userAddresses$: Subject<UserAddressesModel[]> = new BehaviorSubject<
    UserAddressesModel[]
  >([]);

  constructor(private api: ApiMethodsService, private toastr: ToastrService) {}

  public getByUserId(userId: string): void {
    this.api
      .get('user-address/user/' + userId, true)
      .then((res: AxiosResponse) => {
        if (res.data.code === 202) {
          this.userAddresses = res.data.payload;
          this.userAddresses$.next(this.userAddresses);
        } else if (res.data.code === 400) {
          this.toastr.error(res.data.message, res.data.code);
        }
      });
  }

  public getByAddressId(addressId: string): Promise<AxiosResponse> {
    return this.api.get('user-address/' + addressId, true);
  }

  public async createUserAddress(
    userAddress: UserAddressesModel
  ): Promise<UserAddressesModel> {
    return await this.api
      .post(
        'user-address',
        {
          street: userAddress.street,
          houseNumber: userAddress.houseNumber,
          addition: userAddress.addition,
          zipcode: userAddress.zipcode,
          city: userAddress.city,
          country: userAddress.country,
          type: userAddress.type,
          userId: userAddress.user.id
        },
        true
      )
      .then((res: AxiosResponse) => {
        this.userAddresses.push(res.data.payload);
        this.userAddresses$.next(this.userAddresses);
        return res.data.payload;
      });
  }

  public async updateUserAddress(
    userAddress: UserAddressesModel
  ): Promise<UserAddressesModel> {
    return await this.api
      .put(
        'user-address/' + userAddress.id,
        {
          street: userAddress.street,
          houseNumber: userAddress.houseNumber,
          addition: userAddress.addition,
          zipcode: userAddress.zipcode,
          city: userAddress.city,
          country: userAddress.country
        },
        true
      )
      .then((res: AxiosResponse) => {
        const index = this.userAddresses.findIndex(curretUAddress => curretUAddress.id === userAddress.id)
        this.userAddresses[index] = userAddress
        this.userAddresses$.next(this.userAddresses);
        return res.data.payload;
      });
  }

  public async deleteUserAddress(id: string): Promise<AxiosResponse> {
    return await this.api
      .delete('user-address/' + id, true)
      .then((res: AxiosResponse) => {
        const index = this.userAddresses.findIndex(currentAddress => currentAddress.id === id);
        this.userAddresses.splice(index, 1);
        this.userAddresses$.next(this.userAddresses);
        return res;
      });
  }
}
