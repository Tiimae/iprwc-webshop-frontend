import {Injectable} from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {UserModel} from "../_models/user.model";
import * as http from "http";
import {LoggedUserModel} from "../_models/loggedUser.model";

@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {
  private static apiUrl = 'http://127.0.0.1:8080/api/v1.0/';
  private jwtToken: string | null = null;
  private static instance: ApiConnectorService | null = null;
  public user: LoggedUserModel | null = null;

  constructor() {
    if (this.authenticated()) {
      if (this.getTokenFromStore() != null) {
        this.user = this.getUser(this.getTokenFromStore())
      }
    }
  }

  public static getInstance(): ApiConnectorService {
    if (this.instance == null) {
      this.instance = new ApiConnectorService();
    }

    return this.instance;
  }

  public noAuth(): AxiosInstance {
    return axios.create({
      baseURL: ApiConnectorService.apiUrl,
      headers: {
        'Access-Control-Allow-Origin': ApiConnectorService.apiUrl,
      },
    });
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

  public storeJwtToken(jwtToken: string): void {
    localStorage.setItem('jwt-token', jwtToken);
  }

  public getUserIdFromStore(): null | string {
    return localStorage.getItem('user-id');
  }

  public storeUserId(userId: string): void {
    localStorage.setItem('user-id', userId);
  }

  public getUser(token: string | null): LoggedUserModel {
    // @ts-ignore
    return JSON.parse(atob(token.split('.')[1])) as LoggedUserModel;
  }
}
