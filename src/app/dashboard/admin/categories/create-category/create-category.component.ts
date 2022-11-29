import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiMethodsService} from "../../../../_service/api-methods.service";
import {NgForm} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  @ViewChild('f') createForm: NgForm | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    const payload = {
      categoryName: this.createForm?.form.controls['catname'].value,
      productIds: []
    }

    ApiMethodsService.getInstance().post('category', payload, true).then(r => {
      alert("category created")
      this.router.navigate(['dashboard', 'categories'])
    })
  }

}
