import {Injectable} from "@angular/core";
import { ReviewModel } from "src/app/_models/review.model";
import {ApiMethodsService} from "../api-methods.service";

@Injectable({
  providedIn: 'root',
})
export class ReviewDataService {

  constructor(
    private api: ApiMethodsService
  ) {
  }

  post(productId: string, review: ReviewModel): ReviewModel | null {
    let payload = {
      description: review.description,
      stars: review.stars,
      productId: productId
    }

    const res = this.api.post("review", payload, false)
    let response: ReviewModel | null = null;
    res.then(r => {
      response =  r.data.payload;
    })

    return response;
  }
}
