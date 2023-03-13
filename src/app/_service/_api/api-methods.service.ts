import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { ApiConnectorService } from './api-connector.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMethodsService {
  private requestConfig: object = {
    headers: {
      'X-XSRF-TOKEN': ApiConnectorService.xsrfToken
    },
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    withCredentials: true
  };

  constructor(private api: ApiConnectorService) {}

  public async get(path: string, auth: boolean): Promise<AxiosResponse> {
    if (auth) {
      return (await this.api.auth()).get(path);
    }

    return (await this.api.noAuth()).get(path);
  }

  public async post(
    path: string,
    payload: any,
    auth: boolean
  ): Promise<AxiosResponse> {
    if (auth) {
      return (await this.api.auth()).post(path, payload, this.requestConfig);
    }

    return (await this.api.noAuth()).post(path, payload, this.requestConfig);
  }

  public async put(
    path: string,
    payload: any,
    auth: boolean
  ): Promise<AxiosResponse> {
    if (auth) {
      return (await this.api.auth()).put(path, payload, this.requestConfig);
    }

    return (await this.api.noAuth()).put(path, payload, this.requestConfig);
  }

  public async delete(path: string, auth: boolean): Promise<AxiosResponse> {
    if (auth) {
      return (await this.api.auth()).delete(path, this.requestConfig);
    }

    return (await this.api.noAuth()).delete(path, this.requestConfig);
  }
}
