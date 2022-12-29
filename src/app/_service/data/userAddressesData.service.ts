import {Injectable} from "@angular/core";
import { UserAddressesModel } from "src/app/_models/userAddresses.model";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {ApiConnectorService} from "../api-connector.service";
import {ApiMethodsService} from "../api-methods.service";
import {UserDataService} from "./userData.service";

@Injectable({
  providedIn: 'root',
})
export class UserAddressesDataService {
  userAddresses: UserAddressesModel[] = []
  userAddresses$: Subject<UserAddressesModel[]> = new BehaviorSubject<UserAddressesModel[]>([]);

  constructor(
    private api: ApiMethodsService,
    private userDataService: UserDataService,
  ) {
    // this.getAll();
  }

  // async getAll(): Promise<void> {
  //   return await this.api.get('role', true).then(r => {
  //     this.userAddresses = r.data.payload
  //     this.userAddresses$.next(this.userAddresses)
  //   });
  //
  // }

  getByUserId(userId: string): Observable<UserAddressesModel[]> {
    let userAddresses: UserAddressesModel[] = []

    this.userDataService.getCurrentUser(userId).subscribe(r => {
      if (r == undefined) {
        return;
      }

      userAddresses = r.addresses;
    })

    return of(userAddresses)
  }

  async createUserAddress(userAddress: UserAddressesModel) : Promise<void> {
    await this.api.post("user-address", {
      "street": userAddress.street,
      "houseNumber": userAddress.houseNumber,
      "addition": userAddress.addition,
      "zipcode": userAddress.zipcode,
      "city": userAddress.city,
      "country": userAddress.country,
      "type": userAddress.type,
      "userId": userAddress.user.id
    }, true).then(res => {
      console.log(res)
    })
  }
}
