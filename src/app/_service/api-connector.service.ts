import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import * as CryptoJs from 'crypto-js';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectorService {
  public static apiUrl = environment.apiUrl;
  private jwtToken: string | null = null;
  private decryptKey: string | null = null;

  constructor() {}

  public noAuth(): AxiosInstance {
    const instance = axios.create({
      baseURL: ApiConnectorService.apiUrl,
      headers: {
        Accept: 'application/json',
      },
    });

    instance.defaults.headers.common['Content-Type'] = 'application/json';

    return instance;
  }

  public async auth(): Promise<AxiosInstance> {
    const loggedIn = await this.authenticated();

    if (!loggedIn) {
      throw new Error('not logged in');
    }

    if (this.jwtToken === null || !this.jwtToken.length) {
      this.jwtToken = await this.decryptJwtFromStorage();
    }

    let request = axios.create({
      baseURL: ApiConnectorService.apiUrl,
      headers: {
        Authorization: 'Bearer ' + this.jwtToken,
      },
      params: {},
    });

    request.interceptors.request.use(
      (request) => {
        if (localStorage.getItem('jwt-token') == null) {
          return Promise.reject();
        }

        return request;
      },
      (error) => {
        // console.log(error);
        return Promise.reject();
      }
    );

    request.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          console.error('Your login has expired');
          localStorage.removeItem('jwt-token');
          localStorage.removeItem('refresh-token');
          
          window.location.href = environment.base + '/auth/login';

          return Promise.reject();
        }

        return Promise.reject(error);
      }
    );

    return request;
  }

  public async authenticated() {
    let result = this.getTokenFromStore();

    if (result !== null && result.length > 0) {
      const key = await this.getDecryptKey();

      return key !== '';
    }
    return false;
  }

  public async verified() {
    const auth = new AuthService(this);
    const profile = await auth.getProfile();

    if (profile.data.payload.verified) {
      return true;
    }
    return false;
  }

  private getTokenFromStore(): null | string {
    return localStorage.getItem('jwt-token');
  }

  public storeJwtToken(jwtToken: string, secret: string): void {
    localStorage.setItem(
      'jwt-token',
      CryptoJs.Rabbit.encrypt(jwtToken, secret).toString()
    );
  }

  public async getJwtPayload(): Promise<any> {
    const tokenFromStorage = await this.decryptJwtFromStorage();

    if (tokenFromStorage !== '') {
      return JSON.parse(atob(tokenFromStorage.split('.')[1]));
    }
  }

  async getDecryptKey(): Promise<string> {
    if (this.decryptKey === null) {
      try {
        const result = await this.noAuth().get('/auth/secret', {
          withCredentials: true,
        });

        this.decryptKey = result.data['message'];
        return this.decryptKey ?? 'cant happen';
      } catch (error) {
        return '';
      }
    }

    return this.decryptKey;
  }

  public async decryptJwtFromStorage(): Promise<string> {
    let tokenFromStorage = this.getTokenFromStore();

    if (tokenFromStorage === null) {
      return '';
    }

    return CryptoJs.Rabbit.decrypt(
      tokenFromStorage,
      await this.getDecryptKey()
    ).toString(CryptoJs.enc.Utf8);
  }
}
