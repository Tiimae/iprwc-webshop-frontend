import {Injectable} from '@angular/core';
import {AxiosResponse} from 'axios';
import * as CryptoJs from 'crypto-js';
import {environment} from '../../environments/environment';
import {ApiConnectorService} from './_api/api-connector.service';
import {SearchbarComponent} from "../navigation/searchbar/searchbar.component";
import {AppComponent} from "../app.component";
import {CartDataService} from "./_data/cartData.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiConnectorService, private cartDataService: CartDataService) {}

  private static sharedDecryptKey: string = environment.sharedSecret;
  private static cipherOptions = {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7
  };

  public async login(email: string, password: string): Promise<AxiosResponse> {
    const encryptedPassword: string = AuthService.encryptText(password);
    return (await this.api.noAuth()).post(
      'auth/login',
      {
        email,
        password: encryptedPassword
      },
      {
        params: {encrypted: true},
      }
    );
  }

  public logout(): void {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("refresh-token");
    SearchbarComponent.loggedIn.next(false);
    AppComponent.verified = null;
    AppComponent.hasRole = null;
    this.cartDataService.clearCartAfterLogout();
  }

  public async register(
    firstname: string,
    middlename: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    const encryptedPassword: string = AuthService.encryptText(password);

    return await (await this.api.noAuth()).post(
      'auth/register',
      {
        firstName: firstname,
        middleName: middlename,
        lastName: lastname,
        email,
        password: encryptedPassword
      },
      { params: { encrypted: true } }
    );
  }

  public async forgotPassword(email: string): Promise<AxiosResponse> {
    return (await this.api.noAuth()).post('auth/forgot-password?email=' + email);
  }

  public async setNewPassword(
    token: string,
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    const encryptedPassword: string = AuthService.encryptText(password);
    return await (await this.api.noAuth()).post(
      'auth/set-new-password?token=' + token,
      {
        email: email,
        password: encryptedPassword
      },
      { params: { encrypted: true } }
    );
  }

  public async getSecret(): Promise<AxiosResponse> {
    return (await this.api.noAuth()).get('auth/secret');
  }

  public static encryptText(plainText: string): string {
    const secretKey = CryptoJs.MD5(this.sharedDecryptKey).toString();

    return CryptoJs.AES.encrypt(
      CryptoJs.enc.Utf8.parse(plainText),
      CryptoJs.enc.Base64.parse(secretKey),
      this.cipherOptions
    ).toString();
  }

  public static decryptText(encryptedText: string): string {
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
