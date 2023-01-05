import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {BreadcrumbService} from "../../_service/breadcrumb.service";
import {Breadcrumb} from "../../_models/breadcrumb.model";
import { Router } from '@angular/router';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit{
  breadcrumbs$!: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService, private router: Router) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$
  }

  ngOnInit(): void {

  }

  navigateToBreadcrumb(url: string): void {
    const route = url.split("/")
    route.splice(0, 1)

    this.router.navigate(route);
  }

}
