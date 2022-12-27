import {Injectable} from "@angular/core";
import { UserAddressesModel } from "src/app/_models/userAddresses.model";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {ApiConnectorService} from "../api-connector.service";

@Injectable({
  providedIn: 'root',
})
export class UserAddressesDataService {
  userAddresses: UserAddressesModel[] = []
  userAddresses$: Subject<UserAddressesModel[]> = new BehaviorSubject<UserAddressesModel[]>([]);

  constructor(
    private api: ApiConnectorService
  ) {
  }

  getAll(): void {

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
