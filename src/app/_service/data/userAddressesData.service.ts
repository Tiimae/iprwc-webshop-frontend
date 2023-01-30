import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserAddressesModel } from 'src/app/_models/userAddresses.model';
import { ApiMethodsService } from '../api-methods.service';

@Injectable({
  providedIn: 'root',
})
export class UserAddressesDataService {
  private userAddresses: UserAddressesModel[] = [];
  userAddresses$: Subject<UserAddressesModel[]> = new BehaviorSubject<
    UserAddressesModel[]
  >([]);

  constructor(private api: ApiMethodsService) {}

  public getByUserId(userId: string): void {
    this.api.get('user-address/user/' + userId, true).then((res) => {
      console.log(res);
      this.userAddresses = res.data.payload;
      this.userAddresses$.next(this.userAddresses);
    });
  }

  public async getByAddressId(addressId: string): Promise<AxiosResponse> {
    return await this.api.get('user-address/' + addressId, true);
  }

  async createUserAddress(
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
          userId: userAddress.user.id,
        },
        true
      )
      .then((res) => {
        this.userAddresses.push(res.data.payload);
        this.userAddresses$.next(this.userAddresses);
        return res.data.payload;
      });
  }

  async updateUserAddress(
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
          country: userAddress.country,
        },
        true
      )
      .then((res) => {
        return res.data.payload;
      });
  }

  async deleteUserAddress(id: string): Promise<AxiosResponse> {
    return await this.api.delete('user-address/' + id, true).then((res) => {
      return res;
    });
  }
}
