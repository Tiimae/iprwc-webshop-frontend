import {Injectable} from '@angular/core';
import {ApiConnectorService} from "./api-connector.service";
import {AxiosResponse} from "axios";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/utils";

@Injectable({
  providedIn: 'root'
})
export class ApiMethodsService {

  public static instance: ApiMethodsService | null = null;

  constructor() { }

  public static getInstance(): ApiMethodsService {
    if (this.instance == null) {
      this.instance = new ApiMethodsService();
    }

    return this.instance;
  }

  public get(path: string, auth: boolean): Promise<AxiosResponse> {
    if (auth) {
      return ApiConnectorService.getInstance().auth().get(path);
    }

    return ApiConnectorService.getInstance().noAuth().get(path);
  }

  public post(path: string, payload: JsonObject, auth: boolean) : Promise<AxiosResponse> {
    if (auth) {
      return ApiConnectorService.getInstance().auth().post(path, payload);
    }

    return ApiConnectorService.getInstance().noAuth().post(path, payload);
  }

  public put(path: string, payload: JsonObject, auth: boolean) : Promise<AxiosResponse> {
    if (auth) {
      return ApiConnectorService.getInstance().auth().put(path, payload);
    }

    return ApiConnectorService.getInstance().noAuth().put(path, payload);
  }

  public delete(path: string, auth: boolean) : Promise<AxiosResponse> {
    if (auth) {
      return ApiConnectorService.getInstance().auth().delete(path);
    }

    return ApiConnectorService.getInstance().noAuth().delete(path)
  }

}
