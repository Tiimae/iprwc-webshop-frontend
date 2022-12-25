import {Injectable} from "@angular/core";
import { UserAddressesModel } from "src/app/_models/userAddresses.model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserAddressesDataService {
  userAddresses: UserAddressesModel[] = []
  userAddresses$: Subject<UserAddressesModel[]> = new BehaviorSubject<UserAddressesModel[]>([]);
}
