import { Injectable } from '@angular/core';
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

  public get(path: string): Promise<AxiosResponse> {
    return ApiConnectorService.getInstance().auth().get(path);
  }

  public post(path: string, payload: JsonObject) : Promise<AxiosResponse> {
    return ApiConnectorService.getInstance().auth().post(path, payload);
  }

  public put(path: string, payload: JsonObject) : Promise<AxiosResponse> {
    return ApiConnectorService.getInstance().auth().post(path, payload);
  }

  public delete(path: string, payload: JsonObject) : Promise<AxiosResponse> {
    return ApiConnectorService.getInstance().auth().post(path, payload);
  }

}
