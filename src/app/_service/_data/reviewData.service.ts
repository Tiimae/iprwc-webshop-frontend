import {Injectable} from '@angular/core';
import {AxiosResponse} from 'axios';
import {ReviewModel} from 'src/app/_models/review.model';
import {ApiMethodsService} from '../_api/api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewDataService {
  constructor(private api: ApiMethodsService) {}

  public post(productId: string, review: ReviewModel): ReviewModel | null {
    let payload = {
      description: review.description,
      stars: review.stars,
      productId: productId
    };

    const res: Promise<AxiosResponse> = this.api.post('review', payload, false);
    let response: ReviewModel | null = null;
    res.then((r: AxiosResponse) => {
      response = r.data.payload;
    });

    return response;
  }
}
