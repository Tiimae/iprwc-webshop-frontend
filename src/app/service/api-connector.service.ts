import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {
  private static apiUrl = 'http://127.0.0.1:8080/api/v1.0/';
  private jwtToken: string | null = null;
  private static instance: ApiConnectorService | null = null;

  constructor() { }

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
        'Access-Control-Allow-Origin': '*',
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

  private getUserIdFromStore(): null | string {
    return localStorage.getItem('user-id');
  }

  public storeUserId(userId: string): void {
    localStorage.setItem('user-id', userId);
  }
}
