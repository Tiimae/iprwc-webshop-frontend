import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosInstance } from 'axios';
import * as CryptoJs from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { AppComponent } from '../../app.component';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {
  public static apiUrl = environment.apiUrl;
  private jwtToken: string | null = null;

  constructor(private toastr: ToastrService, private router: Router) {}

  public noAuth(): AxiosInstance {
    const instance: AxiosInstance = axios.create({
      baseURL: ApiConnectorService.apiUrl,
      headers: {
        Accept: 'application/json',
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff'
      }
    });

    instance.defaults.headers.common['Content-Type'] = 'application/json';

    return instance;
  }

  public async auth(): Promise<AxiosInstance> {
    const loggedIn: boolean = await this.authenticated();

    if (!loggedIn) {
      throw new Error('not logged in');
    }

    if (this.jwtToken === null || !this.jwtToken.length) {
      this.jwtToken = await this.decryptJwtFromStorage();
    }

    let request: AxiosInstance = axios.create({
      baseURL: ApiConnectorService.apiUrl,
      headers: {
        Authorization: 'Bearer ' + this.jwtToken,
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff'
      },

      params: {}
    });

    request.interceptors.request.use(
      (request) => {
        if (localStorage.getItem('jwt-token') == null) {
          return Promise.reject();
        }

        return request;
      },
      (error) => {
        return Promise.reject();
      }
    );

    request.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem('jwt-token');
          localStorage.removeItem('refresh-token');
          this.toastr.warning('Your login has been expired!', 'OOPS!');

          this.router.navigate(['auth', 'login']);

          return Promise.reject('Login has been expired!');
        }

        return Promise.reject(error);
      }
    );

    return request;
  }

  public async authenticated(): Promise<boolean> {
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

  public async getDecryptKey(): Promise<string> {
    if (AppComponent.decryptKey === null) {
      try {
        const result = await this.noAuth().get('/auth/secret', {
          withCredentials: true
        });

        AppComponent.decryptKey = result.data['message'];
        return AppComponent.decryptKey ?? 'cant happen';
      } catch (error) {
        return '';
      }
    }

    return AppComponent.decryptKey;
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
