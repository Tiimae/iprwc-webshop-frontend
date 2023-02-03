import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { ApiConnectorService } from './api-connector.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMethodsService {
  constructor(private api: ApiConnectorService) {}

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
