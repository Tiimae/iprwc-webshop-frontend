import {Injectable} from '@angular/core';
// import * as bcrypt from 'bcryptjs';
import {AxiosResponse} from 'axios';
import {ApiConnectorService} from "./api-connector.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }

  public login(email: string, password: string): Promise<AxiosResponse> {
    return ApiConnectorService.getInstance().noAuth().post('auth/login', {"email": email, "password": password})
  }

  public async register(firstName: string, middleName: string, lastName: string, email: string, password: string): Promise<AxiosResponse> {
    return ApiConnectorService.getInstance().noAuth().post('/auth/register', {
      "firstName": firstName,
      "middleName": middleName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "orderIds": [],
      "roleIds": [],
      "userAddressIds": []
    });
  }

  // public hashText(plainText: string) {
  //   return bcrypt.hashSync(plainText);
  // }
}
