import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../_models/breadcrumb.model';
import { BreadcrumbService } from '../../_service/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs$!: Observable<Breadcrumb[]>;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private router: Router
  ) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }

  ngOnInit(): void {}

  public navigateToBreadcrumb(url: string): void {
    const route = url.split('/');
    route.splice(0, 1);

    this.router.navigate(route);
  }
}
