import {Injectable} from '@angular/core';
import {AxiosResponse} from 'axios';
import {ToastrService} from 'ngx-toastr';
import {OrderModel} from '../../_models/order.model';
import {ApiMethodsService} from '../_api/api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  constructor(private api: ApiMethodsService, private toastr: ToastrService) {}

  public async getByUserId(userId: string): Promise<AxiosResponse> {
    return await this.api.get('order/' + userId, true);
  }

  public async create(fd: FormData): Promise<OrderModel | undefined> {
    return await this.api.post('order', fd, true).then((res: AxiosResponse) => {
      if (res.data.code === 202) {
        return <OrderModel>res.data.payload;
      } else if (res.data.code === 400) {
        this.toastr.error(res.data.message, res.data.code);
        return undefined;
      } else {
        return undefined;
      }
    });
  }
}
