import {Injectable} from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {LoggedUserModel} from "../_models/loggedUser.model";
import * as CryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {
  public static apiUrl = 'http://localhost:8080/api/v1.0/';
  private jwtToken: string | null = null;
  private static instance: ApiConnectorService | null = null;
  public user: LoggedUserModel | undefined = undefined;
  public decryptKey: string | null = null;

  constructor() {

  }

  public static getInstance(): ApiConnectorService {
    if (this.instance == null) {
      this.instance = new ApiConnectorService();

      this.instance.getJwtPayload().then((r): void => {
        if(r != undefined) {
          // @ts-ignore
          this.instance.user = r;
        }
      });
    }

    return this.instance;
  }

  public noAuth(): AxiosInstance {
    const instance = axios.create({
      baseURL: ApiConnectorService.apiUrl,
      headers: {
        'Access-Control-Allow-Origin': ApiConnectorService.apiUrl,
        Accept: 'application/json',
      },
    });

    instance.defaults.headers.common['Content-Type'] = 'application/json';

    return instance;
  }

  public auth(): AxiosInstance {
    if (!this.authenticated) {
      throw new Error('not logged in');
    }

    if (this.jwtToken === null || !this.jwtToken.length) {
      this.jwtToken = this.getTokenFromStore();
    }

    return axios.create({
      baseURL: ApiConnectorService.apiUrl,
      headers: {
        'Access-Control-Allow-Origin': ApiConnectorService.apiUrl,
        Authorization: this.jwtToken,
      },
    });
  }

  public authenticated() {
    let result = this.getTokenFromStore();

    return result !== null && result.length > 0;
  }

  private getTokenFromStore(): null | string {
    return localStorage.getItem('jwt-token');
  }

  public storeJwtToken(jwtToken: string, secret: string): void {
    localStorage.setItem(
      'jwt-token',
      CryptoJs.Rabbit.encrypt(jwtToken, secret).toString()
    );

    this.getJwtPayload().then((r): void => {
      if(r != undefined) {
        this.user = r;
      }
    });
  }

  public async getDecryptKey(): Promise<string> {

    if (this.decryptKey === null) {
      const result = await this.noAuth().get('/auth/secret', {
        withCredentials: true,
      });
      this.decryptKey = result.data['message'];
    }

    return this.decryptKey ?? 'cant happen';
  }

  public async getJwtPayload(): Promise<LoggedUserModel | undefined> {
    let tokenFromStorage = this.getTokenFromStore();
    if (tokenFromStorage === null) {
      return undefined;
    }

    tokenFromStorage = CryptoJs.Rabbit.decrypt(
      tokenFromStorage,
      await this.getDecryptKey()
    ).toString(CryptoJs.enc.Utf8);

    return JSON.parse(atob(tokenFromStorage.split('.')[1])) as LoggedUserModel;
  }
}
