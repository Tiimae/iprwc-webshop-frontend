import {Injectable} from "@angular/core";
import { UserAddressesModel } from "src/app/_models/userAddresses.model";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {ApiConnectorService} from "../api-connector.service";
import {ApiMethodsService} from "../api-methods.service";

@Injectable({
  providedIn: 'root',
})
export class UserAddressesDataService {
  userAddresses: UserAddressesModel[] = []
  userAddresses$: Subject<UserAddressesModel[]> = new BehaviorSubject<UserAddressesModel[]>([]);

  constructor(
    private api: ApiMethodsService
  ) {
    this.getAll();
  }

  async getAll(): Promise<void> {
    return await this.api.get('role', true).then(r => {
      this.userAddresses = r.data.payload
      this.userAddresses$.next(this.userAddresses)
    });

  }

  getByUserId(userId: string): Observable<UserAddressesModel[]> {
    const userAddresses: UserAddressesModel[] = []

    this.userAddresses.forEach(address => {
      if (address.user.id === userId) {
        userAddresses.push(address);
      }
    })

    return of(userAddresses)
  }
}
