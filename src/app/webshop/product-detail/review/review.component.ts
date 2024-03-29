import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import {ReviewModel} from '../../../_models/review.model';
import {ReviewDataService} from '../../../_service/_data/reviewData.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() public reviews: ReviewModel[] = [];
  @Input() public productId!: string;
  @Output() public addReview: EventEmitter<ReviewModel> =
    new EventEmitter<ReviewModel>();

  faStar = faStar;

  public postReviewForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    stars: new FormControl('', [Validators.required])
  });

  constructor(
    private reviewService: ReviewDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public postReview(): void {
    const description = this.postReviewForm.controls.description.value;
    const stars = this.postReviewForm.controls.stars.value;

    if (description == null || stars == null) {
      this.toastr.error('Something is wrong', 'Error');
      return;
    }

    if (isNaN(Number(stars))) {
      this.toastr.error('Stars must be a number', 'Error');
      return;
    }

    if (Number(stars) > 5) {
      this.toastr.error('You have to many stars', 'Error');
      return;
    }

    if (Number(stars) < 0) {
      this.toastr.error('You have to less stars', 'Error');
      return;
    }

    if (!this.postReviewForm.valid) {
      this.toastr.error('Something is wrong', 'Error');
      return;
    }

    const review = new ReviewModel('', description, Number(stars));

    const response = this.reviewService.post(this.productId, review);

    this.postReviewForm.reset();

    this.reviews.push(review);
    if (response == null) {
      return;
    }

    this.addReview.emit(response);
    this.toastr.success('You plaved a new review', 'Success');
  }
}
