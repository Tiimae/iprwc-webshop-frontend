import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosResponse } from 'axios';
import { ApiConnectorService } from './api-connector.service';

@Injectable({
  providedIn: 'root',
})
export class ApiMethodsService {
  public static instance: ApiMethodsService | null = null;

  constructor(private api: ApiConnectorService) {}

  public static getInstance(): ApiMethodsService {
    if (this.instance == null) {
      this.instance = new ApiMethodsService(new ApiConnectorService());
    }

    return this.instance;
  }

  public async get(path: string, auth: boolean): Promise<AxiosResponse> {
    if (auth) {
      return (await this.api.auth()).get(path);
    }

    return this.api.noAuth().get(path);
  }

  public async post(
    path: string,
    payload: any,
    auth: boolean
  ): Promise<AxiosResponse> {
    if (auth) {
      return (await this.api.auth()).post(path, payload);
    }

    return this.api.noAuth().post(path, payload);
  }

  public async put(
    path: string,
    payload: any,
    auth: boolean
  ): Promise<AxiosResponse> {
    if (auth) {
      return (await this.api.auth()).put(path, payload);
    }

    return this.api.noAuth().put(path, payload);
  }

  public async delete(path: string, auth: boolean): Promise<AxiosResponse> {
    if (auth) {
      return (await this.api.auth()).delete(path);
    }

    return this.api.noAuth().delete(path);
  }
}
