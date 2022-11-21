import { Injectable } from '@angular/core';
// import * as bcrypt from 'bcryptjs';
import { AxiosResponse } from 'axios';
import {ApiConnectorService} from "./api-connector.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }

  public login(email: string, password: string): Promise<AxiosResponse> {
    // console.log(ApiConnectorService.getInstance().noAuth().post('auth/login', {"email": email, "password": password}))

    return ApiConnectorService.getInstance().noAuth().post('auth/login', {"email": email, "password": password})
  }

  public async register(name: string, email: string, password: string) {
    const response = await ApiConnectorService.getInstance().noAuth().post('/auth/register', {
      name,
      email,
      password,
    });
  }

  // public hashText(plainText: string) {
  //   return bcrypt.hashSync(plainText);
  // }
}
