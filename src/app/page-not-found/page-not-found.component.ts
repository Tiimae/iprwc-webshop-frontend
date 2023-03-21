import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private router: Router, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle("F1 Webshop | 404 Not Found");
  }

  public goBack(): void {
    this.router.navigate(['']);
  }
}
