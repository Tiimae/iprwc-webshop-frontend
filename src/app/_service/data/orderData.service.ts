import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { OrderModel } from '../../_models/order.model';
import { ApiMethodsService } from '../api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  constructor(private api: ApiMethodsService) {}

  public async getByUserId(userId: string): Promise<AxiosResponse> {
    return await this.api.get('order/' + userId, true);
  }

  public async create(fd: FormData): Promise<OrderModel> {
    return await this.api.post('order', fd, true).then((res: AxiosResponse) => {
      return <OrderModel>res.data.payload;
    });
  }
}
