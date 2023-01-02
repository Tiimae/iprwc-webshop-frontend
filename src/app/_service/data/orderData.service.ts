import {Injectable} from "@angular/core";
import {ApiMethodsService} from "../api-methods.service";
import {OrderModel} from "../../_models/order.model";

@Injectable({
  providedIn: 'root',
})
export class OrderDataService {

  constructor(
    private api: ApiMethodsService
  ) {
  }

  async create(fd: FormData): Promise<OrderModel> {
    return await this.api.post("order", fd, true).then(res => {
      return <OrderModel> res.data.payload
    })
  }

}
