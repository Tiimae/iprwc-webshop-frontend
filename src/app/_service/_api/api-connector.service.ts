import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import axios, {AxiosInstance} from 'axios';
import * as CryptoJs from 'crypto-js';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';
import {AppComponent} from '../../app.component';
import {AuthService} from '../auth.service';
import {HttpClient} from "@angular/common/http";
import {SearchbarComponent} from "../../navigation/searchbar/searchbar.component";

@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {
  public static apiUrl = environment.apiUrl;
  private jwtToken: string | null = null;

  public static xsrfToken: string | null = null;

  constructor(private toastr: ToastrService, private router: Router) {
  }

  public async noAuth(): Promise<AxiosInstance> {

    const instance: AxiosInstance = axios.create({
      baseURL: ApiConnectorService.apiUrl,
      headers: {
        Accept: 'application/json',
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'X-XSRF-TOKEN': ApiConnectorService.xsrfToken,
      },
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      withCredentials: true
    });
    instance.defaults.headers.common['Content-Type'] = 'application/json';

    instance.interceptors.request.use(
      (request) => {
        return request;
      },
      (error) => {
        return Promise.reject();
      }
    );

    instance.interceptors.response.use((response) => {
      // @ts-ignore
      if (response.config.headers['X-XSRF-TOKEN'] != undefined) {
        // @ts-ignore
        ApiConnectorService.xsrfToken = response.config.headers['X-XSRF-TOKEN']
      }
      return response;
    })

    return instance;

  }

  public async auth(): Promise<AxiosInstance> {
    const loggedIn: boolean = await this.authenticated();

    if (!loggedIn) {
      throw new Error('not logged in');
    }

    if (this.jwtToken === null || !this.jwtToken.length) {
      this.jwtToken = await this.getTokenFromStore();
    }

    let instance: AxiosInstance = axios.create({
      baseURL: ApiConnectorService.apiUrl,
      headers: {
        Authorization: 'Bearer ' + this.jwtToken,
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'X-XSRF-TOKEN': ApiConnectorService.xsrfToken,
      },
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      withCredentials: true,
      params: {}
    });

    instance.interceptors.request.use(
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

    instance.interceptors.response.use(
      (response) => {
        // @ts-ignore
        if (response.config.headers['X-XSRF-TOKEN'] != undefined) {
          // @ts-ignore
          ApiConnectorService.xsrfToken = response.config.headers['X-XSRF-TOKEN']
        }

        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem('jwt-token');
          localStorage.removeItem('refresh-token');

          this.toastr.warning('Your login has been expired!', 'OOPS!');
          SearchbarComponent.loggedIn.next(false);
          this.router.navigate(['auth', 'login']);
          location.reload();

          return Promise.reject('Login has been expired!');
        } else if (error.response.status === 400) {
          this.toastr.error(error.response.data.message, "400")
          return Promise.reject("Something went wrong!")
        } else if (error.response.status === 404) {
          this.router.navigate(["404"]);

          return Promise.reject("Not Found")
        }

        return Promise.reject(error);
      });

    return instance;
  }

  public async authenticated(): Promise<boolean> {
    let result = this.getTokenFromStore();

    return result !== null && result.length > 0;
  }

  private getTokenFromStore(): null | string {
    return localStorage.getItem('jwt-token');
  }

  public async getJwtPayload(): Promise<any> {
    const tokenFromStorage = this.getTokenFromStore();

    if (tokenFromStorage !== null) {
      return JSON.parse(atob(tokenFromStorage.split('.')[1]));
    }
  }
}
