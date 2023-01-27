import {Injectable} from '@angular/core';
import * as CryptoJs from 'crypto-js';
import {ApiConnectorService} from "./api-connector.service";
import {environment} from "../../environments/environment";
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiConnectorService) {
  }

  private static sharedDecryptKey: string = environment.sharedSecret;
  private static cipherOptions = {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7,
  };

  public login(email: string, password: string): Promise<AxiosResponse> {
    const encryptedPassword: string = AuthService.encryptText(password);
    return this.api.noAuth().post(
      'auth/login',
      {
        email,
        password: encryptedPassword,
      },
      {params: {encrypted: true}}
    );
  }

  public logout() {
    // Clear secret cookie aswell?
    localStorage.clear();
  }

  public async register(firstname: string, middlename: string, lastname: string, email: string, password: string) {
    const encryptedPassword: string = AuthService.encryptText(password);

    return await this.api.noAuth().post(
      'auth/register',
      {
        "firstName": firstname,
        "middleName": middlename,
        "lastName": lastname,
        email,
        password: encryptedPassword,
      },
      {params: {encrypted: true}}
    );
  }

  public async getProfile() {
    return await (await this.api.auth()).get('auth/profile');
  }

  public async verifyEmail(token: string) {
    return await (await this.api.auth()).post('auth/verify-email?token=' + token);
  }

  public async sendVerifyEmail() {
    return (await this.api.auth()).get('auth/send-verify-email/');
  }

  public async forgotPassword(email: string) {
    return this.api.noAuth().post('auth/forgot-password?email=' + email);
  }

  public async setNewPassword(token: string, email: string, password: string) {
    const encryptedPassword: string = AuthService.encryptText(password);
    return await this.api.noAuth().post('auth/set-new-password?token=' + token, {
        "email": email,
        "password": encryptedPassword
      },
      {params: {encrypted: true}});
  }

  public getSecret() {
    return this.api.noAuth().get('auth/secret', {withCredentials: true});
  }

  public static encryptText(plainText: string) {
    const secretKey = CryptoJs.MD5(this.sharedDecryptKey).toString();

    return CryptoJs.AES.encrypt(
      CryptoJs.enc.Utf8.parse(plainText),
      CryptoJs.enc.Base64.parse(secretKey),
      this.cipherOptions
    ).toString();
  }

  public static decryptText(encryptedText: string) {
    const secretKey = CryptoJs.MD5(this.sharedDecryptKey).toString();

    return CryptoJS.enc.Utf8.stringify(
      CryptoJS.AES.decrypt(
        encryptedText,
        CryptoJS.enc.Base64.parse(secretKey),
        this.cipherOptions
      )
    );
  }
}
